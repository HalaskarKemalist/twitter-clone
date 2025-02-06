const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

      // If user is not authenticated, log the issue
    console.error('Unauthorized access attempt. Request details:', {
        originalUrl: req.originalUrl,
        method: req.method,
        session: req.session,
        user: req.user  // This will likely be undefined if authentication failed
    });

    res.status(401).json({ message: 'Unauthorized' });
};

module.exports = ensureAuthenticated