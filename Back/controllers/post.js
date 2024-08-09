const { Post, User, sequelize } = require('../models');

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'email', 'isAdmin']
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.postId = Post.id)'), 'likeCount']
                    ]
                },
                order: [['createdAt', 'DESC']]
            });

            res.json(posts);
        } catch (error) {
            console.error('Erreur lors de la récupération des posts :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la récupération des posts' });
        }
    },

    createPost: async (req, res) => {
        const { content } = req.body;
        const imageUrl = `images/${req.file.originalname}`;
        try {
            const post = await Post.create({
                content,
                imageUrl,
                userId: req.auth.userId,
            });
            res.status(201).json(post);
        } catch (error) {
            console.error('Erreur lors de la création du post :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la création du post' });
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }
            res.json(post);
        } catch (error) {
            console.error('Erreur lors de la récupération du post par id :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la récupération du post par id' });
        }
    },

    updatePost: async (req, res) => {
        const { content } = req.body;
        const imageUrl = `images/${req.file.originalname}`;

        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }
            if (post.userId !== req.auth.userId) {
                return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce post' });
            }
            await post.update({ content, imageUrl });
            res.json(post);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du post :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du post' });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }
            await post.destroy();
            res.status(204).end();
        } catch (error) {
            console.error('Erreur lors de la suppression du post :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la suppression du post' });
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }
            const existingLike = await post.getLikes({ where: { userId: req.auth.userId } });
            if (existingLike.length > 0) {
                return res.status(400).json({ message: 'Vous avez déjà liké ce post' });
            }
            await post.createLike({ userId: req.auth.userId });
            res.status(201).json({ message: 'Like ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du like :', error);
            res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du like' });
        }
    },

    unlikePost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }
            const existingLike = await post.getLikes({ where: { userId: req.auth.userId } });
            if (existingLike.length === 0) {
                return res.status(400).json({ message: 'Vous n\'avez pas encore liké ce post' });
            }
            await existingLike[0].destroy();
            res.status(204).end();
        } catch (error) {
            console.error('Erreur lors du retrait du like :', error);
            res.status(500).json({ error: 'Erreur serveur lors du retrait du like' });
        }
    },
};

module.exports = postController;
