const db = require('../config/db');

class CarAnnouncement {
  static async create(data) {
    const {
      title, car_condition, year, brand, model, fuel_type,
      mileage, options, location, price, description,
      image_url, vendor_id
    } = data;

    const [result] = await db.execute(
      `INSERT INTO carannouncement 
        (title, car_condition, year, brand, model, fuel_type, mileage, options, location, price, description, image_url, vendor_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, car_condition, year, brand, model, fuel_type,
        mileage, options, location, price, description,
        image_url, vendor_id
      ]
    );
    return { id: result.insertId };
  }

  static async getAll(userId) {
  const query = `
    SELECT c.*, 
           CASE 
             WHEN CONCAT('*', u.preferred_car_market, '*') LIKE CONCAT('%*', c.brand, '*%') THEN 1
             WHEN f.car_id IS NOT NULL THEN 2
             ELSE 3
           END AS sort_order
    FROM carannouncement c
    LEFT JOIN utilisateur u ON u.id = ?
    LEFT JOIN favoris f ON f.car_id = c.id AND f.user_id = ?
    ORDER BY sort_order, c.created_at DESC
  `;
  const [rows] = await db.execute(query, [userId, userId]);
  return rows;
}


  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM carannouncement WHERE id = ?", [id]);
    return rows[0];
  }

  static async getByVendor(vendorId) {
    const [rows] = await db.execute("SELECT * FROM carannouncement WHERE vendor_id = ?", [vendorId]);
    return rows;
  }

  static async search(query) {
    const likeQuery = `%${query}%`;
    const [rows] = await db.execute(
      `SELECT * FROM carannouncement 
       WHERE title LIKE ? OR brand LIKE ? OR model LIKE ?`,
      [likeQuery, likeQuery, likeQuery]
    );
    return rows;
  }

  static async update(id, updatedFields) {
    const {
      title, car_condition, year, brand, model, fuel_type,
      mileage, options, location, price, description,
      image_url
    } = updatedFields;

    await db.execute(
      `UPDATE carannouncement SET 
        title = ?, car_condition = ?, year = ?, brand = ?, model = ?, fuel_type = ?, 
        mileage = ?, options = ?, location = ?, price = ?, description = ?, image_url = ? 
       WHERE id = ?`,
      [
        title, car_condition, year, brand, model, fuel_type,
        mileage, options, location, price, description,
        image_url, id
      ]
    );
    return { message: 'Announcement updated successfully' };
  }

  static async delete(id) {
    await db.execute("DELETE FROM carannouncement WHERE id = ?", [id]);
    return { message: 'Announcement deleted successfully' };
  }
}

module.exports = CarAnnouncement;