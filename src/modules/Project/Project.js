const { Schema, model } = require('mongoose');
const Ej = require('@ej/Ej')
const Member = require('@member/Member')

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: [{
		type: String,
		enum: ['backend', 'frontend', 'wordpress', 'assessoria', 'treinamento'],
		required: false
	}],
	ej: {
		type: Schema.Types.ObjectId,
		ref: Ej,
		required: true
	},
	team: [{
		type: Schema.Types.ObjectId,
		ref: Member,
		required: false
	}],
	startDate: {
		type: Date,
		required: true
	},
	finishDate: {
		type: Date,
		required: false
	},
	contractLink: {
		type: String,
		required: false
	},
	customer: {
		email: {
			type: String,
			required: false
		},
		contact: {
			type: Date,
			required: false
		},
		name: {
			type: Date,
			required: false
		}
	},
},
	{
		timestamps: true,
	});

module.exports = model('Project', ProjectSchema);