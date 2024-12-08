const db = require('../config/db.config');

class Report {
  static async create(reportData) {
    const { id_propriete, id_locataire, type_probleme, description, statut, date } = reportData;
    const query = `
      INSERT INTO signalement (id_propriete, id_locataire, type_probleme, description, statut, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [id_propriete, id_locataire, type_probleme, description, statut, date];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByPropriete(proprieteId) {
    const query = 'SELECT * FROM signalement WHERE id_propriete = $1 ORDER BY date DESC';
    const { rows } = await db.query(query, [proprieteId]);
    return rows;
  }

  static async findByLocataire(locataireId) {
    const query = 'SELECT * FROM signalement WHERE id_locataire = $1 ORDER BY date DESC';
    const { rows } = await db.query(query, [locataireId]);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM signalement WHERE id_signalement = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Report;