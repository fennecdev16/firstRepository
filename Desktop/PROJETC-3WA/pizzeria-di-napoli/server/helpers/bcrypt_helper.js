const bcrypt = require("bcrypt");
const createError = require("http-errors");
const saltRounds = 10;

 module.exports = {
  isValidPassword: async function(dbPassword, userPassword) {
    try {
      return await bcrypt.compare(dbPassword, userPassword);
    } catch (error) {
      throw error;
    }
  },
  encryptPassword: async function(userPassword) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userPassword, salt)
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  },
}; 

/* module.exports = async function isValidPassword(dbPassword, userPassword) {
  try {
    return await bcrypt.compare(dbPassword, userPassword);
  } catch (error) {
    throw error;
  }
}; */

/* module.exports = async function encryptPassword(password) { 
  return await bcrypt.hash(password, saltRounds)
}; */
