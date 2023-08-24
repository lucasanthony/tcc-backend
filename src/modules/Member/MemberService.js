const bcrypt = require('bcrypt');
const Ej = require('@ej/Ej');
const Member = require('@member/Member');

module.exports = {
	async save(memberData, ejId) {
		const { name, email, role, password, birthDate, entryDate, phone, observations, habilities, department } = memberData;

		const psw = await bcrypt.hash(`${password}`, parseInt(process.env.SALT_ROUNDS))

		const member = await Member.create({
			name: name,
			email: email,
			role: role,
			password: psw,
			birthDate: birthDate,
			ej: ejId,
			entryDate: entryDate,
			phone: phone,
			observations: observations,
			habilities: habilities,
			department: department
		})

		return member;
	},

	// only for test purposes
	async findByEj(ejId) {
		// const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
		const members = await Member.find({ ej: ejId });

		return members;
	},

	async remove(memberId) {
		const member = await Member.deleteOne({ _id: memberId });
		return member;
	},

	async update(memberId, data) {
		if (data.hasOwnProperty('password')) {
            const psw = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS))
            data.password = psw
        }
		
		const updatedMember = await Member.findOneAndUpdate({ _id: memberId }, data)
		return updatedMember
	}
}