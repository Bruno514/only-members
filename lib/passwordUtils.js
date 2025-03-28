const bcrypt = require("bcryptjs");
const crypto = require("crypto");

async function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  return { salt, hash: hashedPassword };
}

function validPassword(password, hash, salt) {
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
