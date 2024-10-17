const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
};

exports.isOrganizer = (req, res, next) => {
    if (req.user.role !== 'organizer') {
        return res.status(403).send('Access denied. Organizers only.');
    }
    next();
};
