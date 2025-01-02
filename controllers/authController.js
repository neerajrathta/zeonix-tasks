
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validateRegistration, validateLogin } = require('../utils/validators');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const { error } = validateRegistration(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'Email already registered' });

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
