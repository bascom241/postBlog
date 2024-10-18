const express = require('express');
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyjjx5whw',
    api_key: '254266613571124',
    api_secret: 'gtlF7qBIGjC3jLcsDwtBlFLUdiM'
})

const router = express.Router();
const blogController = require('../controllers/blogController')

const authContoller = require('../middlewares/authMiddleware')


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        public_id: (req, file) => `${Date.now()}-${file.originalname}` // Use a unique identifier for the file
    }
});

const upload = multer({storage:storage});

router
.route('/posts')
.get(blogController.getPosts);

router
.route('/post/:id')
.get(authContoller.protect,blogController.getPost);

router
.route('/addPost')
.post(authContoller.protect,upload.single('image'),blogController.addPost);

router
.route('/editPost/:id')
.patch(authContoller.protect,upload.single('image'),blogController.editPost)

router
.route('/delete/:id')
.delete(authContoller.protect,blogController.deleteAPost)





module.exports = router;
