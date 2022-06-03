const { Schema, model } = require('mongoose');
const Ej = require('@ej/Ej')

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['assessor', 'diretor', 'trainee', 'estagiário', 'membro'],
        required: true,
        default: 'membro'
    },
    ej: {
        type: Schema.Types.ObjectId,
        ref: Ej,
        required: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    entryDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    observations: {
        type: String,
        required: false
    },
    habilities: [{
        type: String,
        required: false
    }],
    department: {
        type: String,
        required: false
    }
},
    {
        timestamps: true,
    });

module.exports = model('Member', MemberSchema);