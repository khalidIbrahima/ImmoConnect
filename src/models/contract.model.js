const db = require('../config/db.config');

class Contract {
  static async create(contractData) {
    const { id_propriete, id_locataire, date_signature, date_debut, date_fin, statut } = contractData;
    const query = `
      INSERT INTO contrat (id_propriete, id_locataire, date_signature, date_debut, date_fin, statut)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [id_propriete, id_locataire, date_signature, date_debut, date_fin, statut];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM contrat WHERE id_contrat = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async findByLocataire(locataireId) {
    const query = 'SELECT * FROM contrat WHERE id_locataire = $1';
    const { rows } = await db.query(query, [locataireId]);
    return rows;
  }

  static async findByPropriete(proprieteId) {
    const query = 'SELECT * FROM contrat WHERE id_propriete = $1';
    const { rows } = await db.query(query, [proprieteId]);
    return rows;
  }
}

module.exports = Contract;