const { save, findAll, findById } = require('./EjService');

module.exports = {
    async save(req, res) {
        try {
            const data = await save(req.body);
            return res.status(201).send({ ej: data.ej, user: data.user });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const ejs = await findAll();
            return res.status(200).send({ ejs: ejs });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const ej = await findById();
            return res.status(200).send({ ej: ej });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },
}