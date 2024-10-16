import bcrypt from 'bcrypt';

// Función para encriptar una contraseña
export async function encryptPassword(plainPassword) {
    const saltRounds = 10; //
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    
        return hashedPassword;
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        throw error;
    }
}

export async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match; 
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        throw error;
    }
}
