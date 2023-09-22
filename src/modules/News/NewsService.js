const News = require("@news/News");
const Project = require("@project/Project");

module.exports = {
    async save(memberId, newsData, projectId) {
      const { description, image, updateLink } = newsData;

      const news = new News({
         member: memberId,
         project: projectId,
         description,
         image,
         updateLink
       });

      await news.save();

      await Project.updateOne({ _id: projectId }, { $push: { news: news._id } });
      
      return getDTOnews(news);
    },

    async findByProject(projectId) {
      const project = await Project.findOne({ _id: projectId })

      const news = await News.find({ _id: { $in: project.news } });

      return news.map(element => getDTOnews(element));      
    },

    async update(newstId, data) {
      const { description, image, updateLink } = data;

		const updatedNews = await News.findOneAndUpdate({ _id: newstId }, { description, image, updateLink }, { new: true });
		
      return getDTOnews(updatedNews);
	},

   async remove(projectId, data) {
      const project = await Project.findOneAndUpdate({ _id: projectId }, { $pull: { news: data.newsId } }, { new: true })
      
      const news = await News.deleteOne({ _id: data.newsId });
      
      if (news.deletedCount > 0)
         return project.news.map(element => getDTOnews(element));
      else
         throw new Error('Atualização não encontrada.');
    }
}


function getDTOnews(news) {
    return {
        _id: news._id,
        member: news.member,
        project: news.project,
        description: news.description,
        images: news.images,
        updateLink: news.updateLink,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt
    }
}