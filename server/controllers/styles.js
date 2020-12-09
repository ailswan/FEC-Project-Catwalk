var models = require('../models');
const styles = require('../models/styles');
const photos = require('../models/photos');

module.exports = {

  get: function (req, res) {
    console.log('styles.get');

    const product_id = req.params.product_id;
    console.log(product_id);

    models.styles.get({product_id: product_id}, function(err, results) {
      if (err) { throw err; }
      let product = {
        product_id: product_id,
        results: [] // style 
      };
      let stylesMap = {};
      let photoMap = {};
      results.forEach(s => {
        let style_id = s.style_id;

        if (style_id === undefined) {
          return;
        }

        if (!(style_id in stylesMap)) {
          if (s.sale_price === 0) {
            s.sale_price = s.original_price;
          }
          stylesMap[style_id] = {
            style_id: style_id,
            name: s.style_name,
            original_price: s.original_price, 
            sale_price: s.sale_price,
            'default?': s.default_style,
            photos: [],
            skus: {}
          };
        }

        // then we process photos 
        if (!stylesMap[style_id].photos.find(p => p.photo_id === s.photo_id)) {
          stylesMap[style_id].photos.push({
            photo_id: s.photo_id,
            thumbnail_url: s.thumbnail_url,
            url: s.url
          });
        }

        // proccess skus
        stylesMap[style_id].skus[s.skus_id] = {
          quantity: s.quantity,
          size: s.size
        };
      });
      //console.log(stylesMap);

      for (let key in stylesMap) {
        product.results.push(stylesMap[key]);
      }

      console.log(product);
      
      res.json(product);

    });
  }

};
