const { Schema, model } = require("mongoose");
const Project = require("@project/Project");

const NewsSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: false 
    }],
    updateLink: [{
        type: String,
        required: false
    }]
},
    {
        timestamps: true,
    });

module.exports = model("News", NewsSchema);