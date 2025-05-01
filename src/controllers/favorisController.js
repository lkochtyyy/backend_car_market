const Favoris = require('../models/favoris');

// ➕ Ajouter aux favoris
exports.addFavori = (req, res) => {
  const { user_id, car_id } = req.body;
  if (!user_id || !car_id) {
    return res.status(400).json({ error: 'user_id et car_id sont requis' });
  }

  Favoris.add(user_id, car_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Ajouté aux favoris ✅' });
  });
};

exports.getFavorisByUser = (req, res) => {
    console.log("user_id reçu:", req.params.user_id);

    const userId = req.params.user_id;
  
    if (!userId) {
      return res.status(400).json({ error: 'user_id est requis' });
    }
  
    Favoris.getByUser(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, favoris: results });
    });
  };
  
  


exports.deleteFavori = (req, res) => {
    const userId = req.params.user_id;
    const carId = req.params.car_id;
  
    if (!userId || !carId) {
      return res.status(400).json({ error: 'user_id et car_id sont requis' });
    }
  
    Favoris.delete(userId, carId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression du favori' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Aucun favori trouvé à supprimer' });
      } else {
        res.status(200).json({ message: 'Favori supprimé avec succès ✅' });
      }
    });
  };
  
