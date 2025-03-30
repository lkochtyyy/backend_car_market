const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/register", userController.createUser);
router.post("/signIn", userController.signIn);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

router.put("/:id/password", userController.updatePassword);
router.put("/:id", userController.updateUserInfo);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
