const db = require('../config/db.config');

class Property {
  static async create(propertyData) {
    const { id_bailleur, adresse, type, prix, description, statut } = propertyData;
    const query = `
      INSERT INTO propriete (id_bailleur, adresse, type, prix, description, statut)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [id_bailleur, adresse, type, prix, description, statut];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByBailleur(bailleureId) {
    const query = 'SELECT * FROM propriete WHERE id_bailleur = $1';
    const { rows } = await db.query(query, [bailleureId]);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM propriete WHERE id_propriete = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, propertyData, bailleureId) {
    // Vérifier que la propriété appartient au bailleur
    const property = await this.findById(id);
    if (!property || property.id_bailleur !== bailleureId) {
      throw new Error('Propriété non trouvée ou accès non autorisé');
    }

    const { adresse, type, prix, description, statut } = propertyData;
    const query = `
      UPDATE propriete 
      SET adresse = $1, type = $2, prix = $3, description = $4, statut = $5
      WHERE id_propriete = $6 AND id_bailleur = $7
      RETURNING *
    `;
    const values = [adresse, type, prix, description, statut, id, bailleureId];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id, bailleureId) {
    // Vérifier que la propriété appartient au bailleur
    const property = await this.findById(id);
    if (!property || property.id_bailleur !== bailleureId) {
      throw new Error('Propriété non trouvée ou accès non autorisé');
    }

    const query = 'DELETE FROM propriete WHERE id_propriete = $1 AND id_bailleur = $2 RETURNING *';
    const { rows } = await db.query(query, [id, bailleureId]);
    return rows[0];
  }

  static async verifyOwnership(propertyId, bailleureId) {
    const query = 'SELECT EXISTS(SELECT 1 FROM propriete WHERE id_propriete = $1 AND id_bailleur = $2)';
    const { rows } = await db.query(query, [propertyId, bailleureId]);
    return rows[0].exists;
  }
}

module.exports = Property;