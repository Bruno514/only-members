const bcrypt = require("bcryptjs");

async function genPassword() {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  return hashedPassword;
}

async function validPassword(password) {
  return await bcrypt.compare(password, user.password);
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
