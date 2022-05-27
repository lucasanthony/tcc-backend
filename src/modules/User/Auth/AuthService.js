const bcrypt = require('bcrypt');
const User = require('@user/User');
const JWT = require('jsonwebtoken');

const signToken = user => {
    return JWT.sign({
        iss: 'TCC',
        sub: user._id,
        iat: new Date().getTime(),
    }, process.env.JWT_SECRET);
}

module.exports = {
    async signIn(dados) {
        const { email, password } = dados;
        const user = await User.findOne({ email: email });

        if (!user)
            return

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return

        const token = signToken(user);

        user.password = undefined;

        // return res.status(200).cookie("jwt", token, {sameSite: 'none', path: '/', httpOnly: false , secure: false  }).send({
        return {
            "user": user,
            "token": token // retirar isso em produção
        };
    },
}