const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const exportController = require('../controllers/exportController');
const { verifyApiKey } = require('../middlewares/authMiddleware');

router.post('/image', verifyApiKey, upload.single('file'), exportController.generateImage);

module.exports = router;
