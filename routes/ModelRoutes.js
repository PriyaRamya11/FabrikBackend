//  importing the required imports
const express = require('express');
const { getHomeController, postModelController } = require('../controllers/ModelController');
const router = express.Router();


//  home route requests
router.get('/', getHomeController);
router.post('/', postModelController);


module.exports = router;