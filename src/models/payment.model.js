const db = require('../config/db.config');

class Payment {
  static async create(paymentData) {
    const { id_contrat, montant, methode, date } = paymentData;
    const query = `
      INSERT INTO paiement (id_contrat, montant, methode, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [id_contrat, montant, methode, date];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByContrat(contratId) {
    const query = 'SELECT * FROM paiement WHERE id_contrat = $1 ORDER BY date DESC';
    const { rows } = await db.query(query, [contratId]);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM paiement WHERE id_paiement = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Payment;