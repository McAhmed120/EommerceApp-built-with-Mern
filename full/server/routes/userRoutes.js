const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers,deleteUser,editUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware'); // Import protect and adminOnly middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile); // For clients to get their profile
router.get('/', protect, adminOnly, getAllUsers); // For admins to get all users
router.delete('/:id', protect, adminOnly, deleteUser);
router.put('/:id', protect ,adminOnly, editUser);

module.exports = router;
