const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkOwnershipOrAdmin = require('../middleware/admin');
const postController = require('../controllers/post');

const multer = require('../middleware/multer-config');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', [auth, multer.upload.single('file'), multer.optimize], postController.createPost);
router.put('/:id', [auth, checkOwnershipOrAdmin, multer.upload.single('file'), multer.optimize], postController.updatePost);
router.delete('/:id', [auth, checkOwnershipOrAdmin], postController.deletePost);

router.post('/:id/like', auth, postController.likePost);

module.exports = router;
