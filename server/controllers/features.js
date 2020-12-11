var models = require('../models');

module.exports = {

  get: function (req, res) {
    //console.log('features.get');
    // console.log(req.params.product_id);
    const product_id = req.params.product_id;

    models.features.get({product_id: product_id, count: 20 }, function(err, results) {
      if (err) { throw err; }
      res.json(results);
    });
  }
   
};
