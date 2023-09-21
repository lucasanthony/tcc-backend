const { save, remove } = require("./NewsService");

module.exports = {
    async save(req, res) {
        try {
            const news = await save(req.body, req.ejId);
            return res.status(201).send({ news: news });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const removedNews = await remove(req.params.id);
            return res.status(200).send({ news: removedNews, message: "Atualização do projeto removida com sucesso!" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updatedNews = await update(req.params.id, req.body);
            return res.status(200).send({ news: updatedNews, message: 'Atualização do projeto editada com sucesso!' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}