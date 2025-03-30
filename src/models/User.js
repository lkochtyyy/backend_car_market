const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async createUser({ nom, prenom, numTel, email, password, role }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            "INSERT INTO utilisateur (nom, prenom, tel, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [nom, prenom, numTel, email, hashedPassword, role]
        );
        return { id: result.insertId };
    }

    static async findUserByEmail(email) {
        const [user] = await db.execute("SELECT * FROM utilisateur WHERE email = ?", [email]);
        return user[0];
    }

    static async findUserById(id) {
        const [user] = await db.execute("SELECT * FROM utilisateur WHERE id = ?", [id]);
        return user[0];
    }

    static async deleteUser(id) {
        return await db.execute("DELETE FROM utilisateur WHERE id = ?", [id]);
    }

    static async updateUserInfo(id, nom, prenom, numTel) {
        return await db.execute(
            "UPDATE utilisateur SET nom = ?, prenom = ?, tel = ? WHERE id = ?",
            [nom, prenom, numTel, id]
        );
    }    

    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await db.execute("UPDATE utilisateur SET password = ? WHERE id = ?", [hashedPassword, id]);
    }
}

module.exports = User;
