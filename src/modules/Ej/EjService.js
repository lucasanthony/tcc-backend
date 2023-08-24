const Ej = require('@ej/Ej');
const Member = require('@member/Member');
const bcrypt = require('bcrypt');

module.exports = {
    async save(ejData) {
        const { name } = ejData;
        const { presidentData } = ejData;

        const ej = await Ej.create({
            name: name
        })

        const psw = await bcrypt.hash(presidentData.password, parseInt(process.env.SALT_ROUNDS))
        const member = await Member.create({
            name: presidentData.name,
            email: presidentData.email,
            birthDate: presidentData.birthDate,
            password: psw,
            role: 'Presidente',
            ej: ej._id
        })

        member.password = undefined
        return { ej: ej, member: member }
    },

    // only for test purposes
    async findAll() {
        // const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
        const ejs = await Ej.find();

        return ejs;
    },

    async findPresident(ejId) {
        const president = await Member.findOne({ role: 'presidente', ej: ejId });
        return president;
    },

    async findById(ejId) {
        const ej = await Ej.findOne({ _id: ejId });
        return ej
    }
}