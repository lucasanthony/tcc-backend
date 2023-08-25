const jwt = require('jsonwebtoken');
const Member = require('@member/Member');
const { findPresident } = require('@ej/EjService');

module.exports = {
    authorizeUser(req, res, next) {
        authorize(req, res, next, "user");
    },

    authorizePresident(req, res, next) {
        authorize(req, res, next, "presidente");
    }
}

const authorize = (req, res, next, type) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Sem token irmão' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Erro de token' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token inválido' });

        const member = await Member.findOne({ _id: decoded.sub });

        if (!member)
            return res.status(404).send({ error: 'Usuário não existe!' });

        const president = await findPresident(member.ej);

        if (type === "presidente" && `${member._id}` !== `${president._id}`)
            return res.status(403).send({ error: 'Usuário não permitido por aqui!' });

        req.ejId = member.ej;
        req.memberId = member._id;
        return next();
    })
}