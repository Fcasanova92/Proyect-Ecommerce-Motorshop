import bcrypt from "bcrypt";


export async function comparePassword(passwordInput, hashedPassword) {

    const isMatch = await bcrypt.compare(passwordInput, hashedPassword);
    return isMatch

  }