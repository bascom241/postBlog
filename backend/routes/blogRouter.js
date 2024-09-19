const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinaryConfig'); 

const router = express.Router();
const blogController = require('../controllers/blogController');
const authController = require('../middlewares/authMiddleware');

const upload = multer({ storage });

router
  .route('/posts')
  .get(blogController.getPosts);

router
  .route('/post/:id')
  .get(authController.protect, blogController.getPost);

router
  .route('/addPost')
  .post(authController.protect, upload.single('image'), blogController.addPost);

router
  .route('/editPost/:id')
  .patch(authController.protect, upload.single('image'), blogController.editPost);

router
  .route('/delete/:id')
  .delete(authController.protect, blogController.deleteAPost);

module.exports = router;
