const { save, findByEj, remove, update } = require('./UserService');

module.exports = {
    async save(req, res) {
        try {
            const user = await save(req.body);
            return res.status(201).send({ user: user });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async findByEj(req, res) {
        try {
            const users = await findByEj(req.ejId);
            return res.status(201).send({ users: users });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const removedUser = await remove(req.params.id);
            return res.status(200).send({ user: removedUser, message: 'Usuário removido com sucesso!' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updatedUser = await update(req.params.id, req.body);
            return res.status(200).send({ user: updatedUser, message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}