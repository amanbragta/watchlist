import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hasedPassword = await bcrypt.hash(password, salt);
  return hasedPassword;
};

export const comparePassword = (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};
