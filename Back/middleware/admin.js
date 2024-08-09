const { Post } = require('../models');

const checkOwnershipOrAdmin = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (req.auth.isAdmin || post.userId === req.auth.userId) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error checking ownership or admin:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = checkOwnershipOrAdmin;
