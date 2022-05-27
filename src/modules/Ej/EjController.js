const { save, findAll } = require('./EjService');

module.exports = {
    async save(req, res) {
        try {
            const ej = await save(req.body);
            return res.status(201).send({ ej: ej });
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
    }
}