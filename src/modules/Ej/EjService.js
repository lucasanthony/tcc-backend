const Ej = require('@ej/Ej');
const User = require('@user/User');
const bcrypt = require('bcrypt');

module.exports = {
    async save(ejData) {
        const { name } = ejData;
        const { presidentData } = ejData;

        const user = await User.findOne({ email: presidentData.email });
        if (user) {
            throw new Error('Já existe uma EJ cadastrada para esse email!');
        }

        const ej = await Ej.create({
            name: name
        })

        const psw = await bcrypt.hash(presidentData.password, parseInt(process.env.SALT_ROUNDS))
        const newUser = await User.create({
            name: presidentData.name,
            email: presidentData.email,
            birthDate: presidentData.birthDate,
            password: psw,
            role: 'Presidente',
            ej: ej._id
        })

        newUser.password = undefined
        return { ej: ej, user: newUser }
    },

    // only for test purposes
    async findAll() {
        // const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
        const ejs = await Ej.find();

        return ejs;
    },

    async findPresident(ejId) {
        const president = await User.findOne({ role: 'presidente', ej: ejId });
        return president;
    },

    async findById(ejId) {
        const ej = await Ej.findOne({ _id: ejId });
        return ej;
    },
}