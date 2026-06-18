const db = require('../db');

// ========================================
// THE 5TH REQUIREMENT: Global authentication middleware
// This middleware intercepts EVERY protected request
// and checks if the user is still active (not blocked/deleted)
// ========================================
const checkUserStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Query database to check current user status
        const result = await db.query(
            'SELECT status FROM users WHERE id = $1',
            [userId]
        );

        // If user not found (deleted), force logout
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'User not found. Please login again.' });
        }

        const user = result.rows[0];

        // If user is blocked, force logout with 403
        if (user.status === 'blocked') {
            return res.status(403).json({ message: 'Your account is blocked' });
        }

        // User is valid, continue to next middleware/controller
        next();
    } catch (error) {
        console.error('User status check error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = checkUserStatus;
