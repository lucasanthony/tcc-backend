const bcrypt = require('bcrypt');
const User = require('@user/User');

module.exports = {
    async save(userData, ejId) {
        const { name, email, role, password, birthDate } = userData

        const psw = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))

        const user = await User.create({
            name: name,
            email: email,
            birthDate: birthDate,
            password: psw,
            role: role,
            ej: ejId
        })

        return user;
    }
}