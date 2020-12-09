var db = require('../db');

module.exports = {

  get: function ({product_id}, callback) {
    var queryStr = 
    `SELECT * FROM styles St
     LEFT JOIN photos Ph
     ON St.style_id = Ph.style_id
     LEFT JOIN skus Sk
     On St.style_id = Sk.style_id
    WHERE St.product_id = ${product_id}`;
    db.query(queryStr, function(err, results) {
      callback(err, results);      
    });
  }

};