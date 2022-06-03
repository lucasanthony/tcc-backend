const Link = require('./Link');

module.exports = {
    async save(linkData, ejId) {
        const { name, url, tags, departments, observations } = linkData;

        const link = await Link.create({
            name,
            url,
            tags,
            departments: departments,
            ej: ejId,
            observations
        })

        return link;
    },

    // only for test purposes
    async findByEj(ejId) {
        // const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
        const links = await Link.find({ ej: ejId });

        return links;
    },

    async remove(linkId) {
        const link = await Link.deleteOne({ _id: linkId });
        return link;
    },

    async update(linkId, data) {
        const updatedLink = await Link.findOneAndUpdate({ _id: linkId }, data)
        return updatedLink
    }
}