const bcrypt = require("bcrypt");
const Ej = require("@ej/Ej");
const Member = require("@member/Member");

module.exports = {
  async save(memberData, ejId) {
    const {
      name,
      email,
      role,
      password,
      birthDate,
      entryDate,
      phone,
      observations,
      habilities,
      department,
    } = memberData;

    const psw = await bcrypt.hash(
      `${password}`,
      parseInt(process.env.SALT_ROUNDS)
    );

    const member = await Member.create({
      name,
      email,
      role,
      password: psw,
      birthDate,
      ej: ejId,
      entryDate,
      phone,
      observations,
      habilities,
      department,
    });

    return getDTOmember(member);
  },

  // only for test purposes
  async findByEj(req) {
    // const ejs = await Ej.find().populate({ path: 'president', select: 'name -_id' });
    const members = await Member.find({ ej: req.ejId });

    const membersDTO = members.map((member) => {
      if (member._id.toString() === req.memberId.toString())
        return { ...getDTOmember(member), ...{ loged: true } };
      return getDTOmember(member);
    });

    return membersDTO;
  },

  async remove(memberId) {
    const member = await Member.findOne({ _id: memberId });
    const members = await Member.find({ ej: member.ej });

    if (members.length <= 1)
      throw new Error("A presença de ao menos um usuário na EJ é obrigatória.");

    member.delete();

    return getDTOmember(member);
  },

  async update(memberId, data) {
    if (data.hasOwnProperty("password")) {
      const psw = await bcrypt.hash(
        data.password,
        parseInt(process.env.SALT_ROUNDS)
      );
      data.password = psw;
    }

    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      data
    );

    return getDTOmember(updatedMember);
  },
};

function getDTOmember(member) {
  return {
    _id: member._id,
    name: member.name,
    email: member.email,
    role: member.role,
    ej: member.ej,
    birthDate: member.birthDate,
    entryDate: member.entryDate,
    phone: member.phone,
    observations: member.observations,
    habilities: member.habilities,
    department: member.department,
  };
}
