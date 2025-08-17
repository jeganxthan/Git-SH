const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SESSION_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next(); 
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there's no token
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };


module.exports={protect}