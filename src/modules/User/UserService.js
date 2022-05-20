const bcrypt = require('bcrypt');
const User = require('@user/User');
const { remove } = require('../Ej/Ej');

module.exports = {
    async save(userData, ejId) {
        const { name, email, role, birthDate } = userData

        // password auto generated for first access with 6 digits
        const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
        const psw = await bcrypt.hash(code, parseInt(process.env.SALT_ROUNDS))

        const user = await User.create({
            name: name,
            email: email,
            birthDate: birthDate,
            password: psw,
            role: role,
            ej: ejId
        })

        return user;
    },

    async findByEj(ejId) {
        const users = await User.find({ ej: ejId }).select('-password');
        return users;
    },

    async remove(userId) {
        const removedUser = await User.deleteOne({ _id: userId });
        return removedUser
    },

    /**
    * Atualiza um usuário existente no sistema
    * @param {String} userId - Id do usuário a ser atualizado.
    * @param {Object} data - Novos valores a serem atualizados.
    * @returns {Object} Retorna o usuário com os dados atualizados.
    */
    async update(userId, data) {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, data)
        return updatedUser
    }
}