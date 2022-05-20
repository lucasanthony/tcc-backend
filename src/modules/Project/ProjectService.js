const Project = require('@project/Project');

module.exports = {
    async save(projectData) {
        const { name, description, tags, ejId, team, startDate, finishDate } = projectData;

        await Project.create({
            name: name,
            description: description,
            tags: tags,
            team: team,
            ej: ejId,
            startDate: startDate,
            finishDate: finishDate
        })

        return project;
    },

    // only for test purposes
    async findByEj(ejId) {
        // const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
        const projects = await Project.find({ ej: ejId });

        return projects;
    },

    async remove(projectId) {
        const project = await Project.deleteOne({ _id: projectId });
        return project;
    },

    async update(projectId, data) {
        const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, data)
        return updatedProject
    }
}