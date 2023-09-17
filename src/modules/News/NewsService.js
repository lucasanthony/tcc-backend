const News = require("@news/News");

module.exports = {
    async save(newsData, projectId) {
        const { description, images, updateLink } = newsData;

        const news = await News.create({
            project: projectId,
            description,
            images,
            updateLink
        })
        return getDTOnews(news);
    },

    async remove(newsId) {
        const news = await News.deleteOne({ _id: newsId });
        return getDTOnews(news);
    }
}

function getDTOnews(news) {
    return {
        _id: news._id,
        project: news.project,
        description: news.description,
        images: news.images,
        updateLink: news.updateLink
    }
}