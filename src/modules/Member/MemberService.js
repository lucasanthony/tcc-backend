const Ej = require('@ej/Ej');
const Member = require('@member/Member');

module.exports = {
	async save(memberData, ejId) {
		const { name, email, role, birthDate, entryDate, phone, observations, habilities, department } = memberData;

		const member = await Member.create({
			name,
			email,
			role,
			birthDate,
			ej: ejId,
			entryDate,
			phone,
			observations,
			habilities,
			department
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
		const updatedMember = await Member.findOneAndUpdate({ _id: memberId }, data)
		return updatedMember
	}
}