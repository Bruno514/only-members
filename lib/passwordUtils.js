const bcrypt = require("bcryptjs");

async function genPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function validPassword(password, userPassword) {
  const result = await bcrypt.compare(password, userPassword);
  
  return result;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
