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
    }
},
    {
        timestamps: true,
    });

module.exports = model('Member', MemberSchema);