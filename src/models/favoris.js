const db = require('../config/db');

const Favoris = {

  //check if favoris already exists
  exists: (user_id, car_id, callback) => {
    const sql = 'SELECT * FROM favoris WHERE user_id = ? AND car_id = ?';
    db.query(sql, [user_id, car_id], (err, results) => {
      if (err) return callback(err);
      callback(null, results.length > 0);
    });
  },
  
  // ➕ Ajouter un favori
  add: (user_id, car_id, callback) => {
    const sql = 'INSERT INTO favoris (user_id, car_id) VALUES (?, ?)';
    db.query(sql, [user_id, car_id], callback);
  },

  getByUser: (user_id, callback) => {
    db.query(
      'SELECT * FROM favoris WHERE user_id = ?',
      [user_id],
      callback
    );
  },
  

  // ❌ Supprimer un favori
  delete: (user_id, car_id, callback) => {
    const sql = 'DELETE FROM favoris WHERE user_id = ? AND car_id = ?';
    db.query(sql, [user_id, car_id], callback);
  }
};

module.exports = Favoris;
