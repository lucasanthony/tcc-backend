const { signIn } = require('./AuthService');

module.exports = {
    async signIn(req, res) {
        try {
            const dados = await signIn(req.body)
            return res.status(200).send({ dados: dados })
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    },
}