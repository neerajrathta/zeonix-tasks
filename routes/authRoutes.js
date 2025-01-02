
const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});

module.exports = router;
