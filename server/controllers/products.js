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
      let p = results[0];
      var product = {
        id: p['product_id'],
        name: p['product_name'],
        slogan: p['slogan'],
        description: p['description'],
        category: p['category'],
        default_price: p['default_price'],
        features: []
      };
      results.forEach(x => {
        product.features.push({feature: x['feature'], value: x['value'] });
      });

      res.json(product);

      // var product = results[0];

      // models.features.get({product_id: product_id, count: 20}, function(err, features) {
      //   product['features'] = features.map(x => { return {feature: x['feature'], value: x['value'] }; });
      //   res.json(product);
      // });

      // get the product 


    });
  }

};
