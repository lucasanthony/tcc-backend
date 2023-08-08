const Ej = require('@ej/Ej');
const User = require('@user/User');
const bcrypt = require('bcrypt');

module.exports = {
    async save(ejData) {
        const { name } = ejData;
        const { presidentData } = ejData;

        if (this.emailAlreadyExists(presidentData.email)) {
            return res.status(500).send({ error: 'Já existe uma EJ cadastrada para esse email!' });
        }

        const ej = await Ej.create({
            name: name
        })

        const psw = await bcrypt.hash(presidentData.password, parseInt(process.env.SALT_ROUNDS))
        const user = await User.create({
            name: presidentData.name,
            email: presidentData.email,
            birthDate: presidentData.birthDate,
            password: psw,
            role: 'presidente',
            ej: ej._id
        })

        user.password = undefined
        return { ej: ej, user: user }
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

    async emailAlreadyExists(userEmail) {
        const user = await User.findOne({ email: userEmail });
        return user != null;
    },
}