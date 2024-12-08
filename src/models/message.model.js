const db = require('../config/db.config');

class Message {
  static async create(messageData) {
    const { id_expediteur, id_recepteur, contenu } = messageData;
    const query = `
      INSERT INTO message (id_expediteur, id_recepteur, contenu)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [id_expediteur, id_recepteur, contenu];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findConversation(user1Id, user2Id) {
    const query = `
      SELECT * FROM message 
      WHERE (id_expediteur = $1 AND id_recepteur = $2)
      OR (id_expediteur = $2 AND id_recepteur = $1)
      ORDER BY date ASC
    `;
    const { rows } = await db.query(query, [user1Id, user2Id]);
    return rows;
  }

  static async markAsRead(messageId) {
    const query = 'UPDATE message SET lu = true WHERE id_message = $1 RETURNING *';
    const { rows } = await db.query(query, [messageId]);
    return rows[0];
  }
}

module.exports = Message;