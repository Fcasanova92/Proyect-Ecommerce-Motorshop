import bcrypt from "bcrypt";

export async function hashPassword(password) {
  try {
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    throw error; // Lanza el error para manejarlo en el código que llama a esta función
  }
}

