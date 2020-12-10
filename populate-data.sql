use products;

delete from features;

LOAD DATA LOCAL INFILE '/Users/shiwei/hrnyc33/w8d2/CSV/features.csv' 
IGNORE INTO TABLE features 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


delete from photos;
LOAD DATA LOCAL INFILE '../CSV/photos.csv' 
IGNORE INTO TABLE photos
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


/* run: source populate-data.sql */
delete from product;

LOAD DATA LOCAL INFILE './CSV/product.csv' 
IGNORE INTO TABLE product
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

delete from skus;
LOAD DATA LOCAL INFILE '/Users/shiwei/hrnyc33/w8d2/CSV/skus.csv' 
IGNORE INTO TABLE skus
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

delete from styles;
LOAD DATA LOCAL INFILE '/Users/shiwei/hrnyc33/w8d2/CSV/styles.csv' 
IGNORE INTO TABLE styles
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
