var express = require('express');
var router = express.Router();
var db  = require('../models');
const indexController=require('../controllers/index_controller');
const middleWare=require('../controllers/middleware');

router.route('/').post(middleWare.preCheckContent ,indexController.createItem);
router.route('/').get(indexController.showAll);
router.route('/todo/:id').delete(middleWare.idNotANum,middleWare.idIsUnique,indexController.deleteItem);
router.route('/todo/:id').post(middleWare.idNotANum,middleWare.idIsUnique,indexController.revItem);
router.route('/todo/:id').put(middleWare.idNotANum,middleWare.idIsUnique,indexController.updateItem);

module.exports = router;