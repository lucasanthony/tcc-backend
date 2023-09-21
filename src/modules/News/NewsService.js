const News = require("@news/News");
const Project = require("@project/Project");

module.exports = {
    async save(newsData, projectId) {
        const { description, image, updateLink } = newsData;

        const news = await News.create({
            project: projectId,
            member: memberId,
            description,
            image,
            updateLink
        })
        const project = await Project.findOne({ _id: projectId });
        const projectNews = project.news.push(news._id);
        project.update({ news: projectNews });
        
        return getDTOnews(news);
    },

    async remove(newsId) {
        const news = await News.deleteOne({ _id: newsId });
        return getDTOnews(news);
    },

    async update(newstId, data) {
		const updatedNews = await News.findOneAndUpdate({ _id: newstId }, data)
		return getDTOnews(updatedNews);
	}
}

function getDTOnews(news) {
    return {
        _id: news._id,
        description: news.description,
        images: news.images,
        updateLink: news.updateLink
    }
}