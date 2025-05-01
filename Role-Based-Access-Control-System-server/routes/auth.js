const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV_PRODUCTION } = require('../constant/constant.js');
const authMiddleware = require('../middleware/authMiddleware');

// Register user route
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Create a new user instance
        user = new User({ name, email, password, role: role });

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Create JWT token payload
        const payload = { user: { id: user.id, role: user.role } };

        // Sign the JWT and set it in a cookie
        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
            if (err) throw err;

            // Send the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NODE_ENV_PRODUCTION, // Secure flag for production (ensures cookies are sent over HTTPS)
                maxAge: process.env.JWT_EXPIRATION
            });

            res.status(200)
                .json({
                    msg: 'User signed up successfully',
                    user: { id: user.id }
                });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Login user route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Compare password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

        // Create JWT token payload
        const payload = { user: { id: user.id, role: user.role } };

        // Sign the JWT and set it in a cookie
        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
            if (err) throw err;

            // Send the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NODE_ENV_PRODUCTION,
                maxAge: process.env.JWT_EXPIRATION
            });

            res.status(200)
                .json({
                    msg: 'User logged in successfully',
                    user: { id: user.id }
                });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Logout route
router.post('/logout', authMiddleware, (req, res) => {
    res
        .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === NODE_ENV_PRODUCTION,
        })
        .status(200)
        .json({ msg: 'User logged out successfully' });
});


// This route is protected and requires authentication
// It uses the authMiddleware to verify the JWT token
// and extract the user information from it
// The user information is then used to fetch the user details from the database
router.get('/token', authMiddleware, async (req, res) => {
    try {
        const user = await User
            .findById(req.user.id)
            .select('-password')
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.status(200)
            .json({
                msg: 'User verified successfully',
                user: { id: user.id }
            });
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports = router;
