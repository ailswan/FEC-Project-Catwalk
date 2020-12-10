CREATE TABLE `product`(
    `product_id` INT UNSIGNED NOT NULL,
    `product_name` TEXT NOT NULL,
    `slogan` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `category` TEXT NOT NULL,
    `default_price` INT NOT NULL
);
ALTER TABLE
    `product` ADD PRIMARY KEY `product_id_primary`(`product_id`);


CREATE TABLE `styles`(
    `style_id` INT UNSIGNED NOT NULL,
    `product_id` INT,
    `style_name` TEXT,
    `sale_price` FLOAT,
    `original_price` FLOAT,
    `default_style` INT
);
ALTER TABLE
    `styles` ADD PRIMARY KEY `style_id_primary`(`style_id`);
ALTER TABLE 
    `styles` ADD INDEX `product_id_index` (`product_id`);


CREATE TABLE `photos`(
    `photo_id` INT UNSIGNED NOT NULL,
    `style_id` INT,
    `url` TEXT,
    `thumbnail_url` TEXT
);
ALTER TABLE
    `photos` ADD PRIMARY KEY `photo_id_primary`(`photo_id`);
ALTER TABLE
    `photos` ADD INDEX `style_id_index`(`style_id`);



CREATE TABLE `skus`(
    `skus_id` INT UNSIGNED NOT NULL,
    `style_id` INT,
    `size` TEXT,
    `quantity` INT
);
ALTER TABLE
    `skus` ADD PRIMARY KEY `skus_id_primary`(`skus_id`);
ALTER TABLE
    `skus` ADD INDEX`style_id_index`(`style_id`);


CREATE TABLE `features`(
    `feature_id` INT NOT NULL,
    `product_id` INT,
    `feature` TEXT,
    `value` TEXT
);
ALTER TABLE
    `features` ADD PRIMARY KEY `feature_id_primary`(`feature_id`);
ALTER TABLE
    `product` ADD INDEX `product_id_index`(`product_id`);