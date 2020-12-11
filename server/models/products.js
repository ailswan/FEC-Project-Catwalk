var db = require('../db');

module.exports = {


  getALl: function({count}, callback) {
        
  },

  get: function ({product_id, count}, callback) {
    var queryStr = `
    SELECT * FROM product P
    LEFT JOIN features F
    ON P.product_id = F.product_id
    WHERE P.product_id = ${product_id} LIMIT ${count}`;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  }

};
