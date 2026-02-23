import * as bcrypt from 'bcryptjs';
// Hashing a password
const saltRounds = 10; // Cost factor
const password = 'mySecurePassword';

function hashPassword(password: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                reject(err);
            } else {
                console.log('Hashed password:', hash);
                resolve(hash);
            }
        });
    });
}

async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export { hashPassword, comparePassword }; 