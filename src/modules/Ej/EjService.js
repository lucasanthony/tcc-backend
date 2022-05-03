const Ej = require('@ej/Ej');
const User = require('@user/User');
const bcrypt = require('bcrypt');

module.exports = {
    async save(ejData) {
        const { name } = ejData;
        const { presidentData } = ejData.presidentData;

        const psw = await bcrypt.hash(presidentData.password, process.env.SALT_ROUNDS)
        const president = await User.create({
            name: presidentData.name,
            email: presidentData.email,
            birthDate: presidentData.birthDate,
            password: psw
        })

        const ej = await Ej.create({
            name: name,
            president: president._id
        })

        return ej;
    },

    // only for test purposes
    async findAll() {
        const ejs = await Ej.find();

        return ejs;
    }
}