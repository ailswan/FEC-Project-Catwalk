var models = require('../models');

module.exports = {

  getAll: function(req, res) {


  },

  get: function (req, res) {
    //console.log('product.get');

    const product_id = req.params.product_id;

    models.products.get({product_id: product_id, count: 20 }, function(err, results) {
      if (err) { throw err; }
      
      if ( results.length === 0) {
        throw ex;
      }
      var product = results[0];

      models.features.get({product_id: product_id, count: 20}, function(err, features) {
        product['features'] = features.map(x => { return {feature: x['feature'], value: x['value'] }; });
        res.json(product);
      });

      // get the product 





    });
  }

};
