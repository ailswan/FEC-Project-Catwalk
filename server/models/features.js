var db = require('../db');

module.exports = {

  get: function ({product_id, count}, callback) {
   
    var queryStr = `SELECT feature_id, product_id, feature, value FROM features WHERE product_id = ${product_id} LIMIT ${count}`;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  }
};
