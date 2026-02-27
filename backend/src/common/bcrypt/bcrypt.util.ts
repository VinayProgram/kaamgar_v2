import * as bcrypt from 'bcrypt';

export class BcryptUtil {
    private static readonly SALT_ROUNDS = 10;

    /**
     * Hashes a plain text password.
     * @param password The plain text password to hash.
     * @returns A promise that resolves to the hashed password.
     */
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param password The plain text password.
     * @param hash The hashed password.
     * @returns A promise that resolves to true if the passwords match, false otherwise.
     */
    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
