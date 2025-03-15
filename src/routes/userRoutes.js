const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/register", userController.createUser);
router.post("/signIn", userController.signIn);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);

router.put("/users/:id/nom", userController.updateNom);
router.put("/users/:id/prenom", userController.updatePrenom);
router.put("/users/:id/numTel", userController.updateNumTel);
router.put("/users/:id/password", userController.updatePassword);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
