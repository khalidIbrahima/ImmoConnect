const db = require('../config/db.config');

class User {
  static async create(userData) {
    const { nom, email, telephone, type, loginType, socialId, active, password } = userData;
    const query = `
      INSERT INTO utilisateur (nom, email, telephone, type, login_type, social_id, active, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [nom, email, telephone, type, loginType, socialId, active, password];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM utilisateur WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM utilisateur WHERE id_utilisateur = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async findBySocialId(loginType, socialId) {
    const query = 'SELECT * FROM utilisateur WHERE login_type = $1 AND social_id = $2';
    const { rows } = await db.query(query, [loginType, socialId]);
    return rows[0];
  }

  static async activate(userId) {
    const query = 'UPDATE utilisateur SET active = true WHERE id_utilisateur = $1 RETURNING *';
    const { rows } = await db.query(query, [userId]);
    return rows[0];
  }

  static async deactivate(userId) {
    const query = 'UPDATE utilisateur SET active = false WHERE id_utilisateur = $1 RETURNING *';
    const { rows } = await db.query(query, [userId]);
    return rows[0];
  }

  static async updateType(userId, newType) {
    const query = 'UPDATE utilisateur SET type = $1 WHERE id_utilisateur = $2 RETURNING *';
    const { rows } = await db.query(query, [newType, userId]);
    return rows[0];
  }
}

module.exports = User;