var controller = require('./controllers');

var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/', controller.products.getAll);
router.get('/:product_id', controller.products.get);
router.get('/:product_id/styles', controller.styles.get);
 

module.exports = router;

