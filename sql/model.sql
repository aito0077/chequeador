-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'User'
-- 
-- ---

DROP TABLE IF EXISTS `User`;
        
CREATE TABLE `User` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NULL,
  `password` VARCHAR(30) NULL,
  `provider` VARCHAR(30) NULL,
  `provider_id` VARCHAR(60) NULL,
  `mail` VARCHAR(60) NULL,
  `picture` VARCHAR(300) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Checkup'
-- 
-- ---

DROP TABLE IF EXISTS `Checkup`;
        
CREATE TABLE `Checkup` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NULL,
  `phase` VARCHAR(30) NULL,
  `fork_from` INTEGER NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_by` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Quote'
-- 
-- ---

DROP TABLE IF EXISTS `Quote`;
        
CREATE TABLE `Quote` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `author` INTEGER NOT NULL,
  `where` MEDIUMTEXT NOT NULL,
  `when` DATE NULL,
  `category_id` INTEGER NULL,
  `rate` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Source'
-- 
-- ---

DROP TABLE IF EXISTS `Source`;
        
CREATE TABLE `Source` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NULL,
  `source_entity_id` INTEGER NULL,
  `type` INTEGER NULL,
  `what` MEDIUMTEXT NULL,
  `checked` BIT DEFAULT 0,
  `observation` MEDIUMTEXT NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Context'
-- 
-- ---

DROP TABLE IF EXISTS `Context`;
        
CREATE TABLE `Context` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL DEFAULT 0,
  `body` MEDIUMTEXT NOT NULL,
  `tags` VARCHAR(100) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rates'
-- 
-- ---

DROP TABLE IF EXISTS `Rates`;
        
CREATE TABLE `Rates` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `qualification` INTEGER NULL,
  `score` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Entity'
-- 
-- ---

DROP TABLE IF EXISTS `Entity`;
        
CREATE TABLE `Entity` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NULL,
  `description` VARCHAR(300) NULL,
  `type` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Input'
-- Aportes/Post
-- ---

DROP TABLE IF EXISTS `Input`;
        
CREATE TABLE `Input` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `type` INTEGER NULL,
  `refers_to` INTEGER NULL,
  `text` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) COMMENT 'Aportes/Post';

-- ---
-- Table 'Comment'
-- 
-- ---

DROP TABLE IF EXISTS `Comment`;
        
CREATE TABLE `Comment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `input_id` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Action'
-- 
-- ---

DROP TABLE IF EXISTS `Action`;
        
CREATE TABLE `Action` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `made_by` INTEGER NULL,
  `type` INTEGER NULL,
  `on` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Checkup_User'
-- 
-- ---

DROP TABLE IF EXISTS `Checkup_User`;
        
CREATE TABLE `Checkup_User` (
  `user_id` INTEGER NOT NULL,
  `checkup_id` INTEGER NOT NULL,
  `role_id` INTEGER NOT NULL DEFAULT 0,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `checkup_id`)
);

-- ---
-- Table 'Entity_Relation'
-- 
-- ---

DROP TABLE IF EXISTS `Entity_Relation`;
        
CREATE TABLE `Entity_Relation` (
  `entity_id_from` INTEGER NULL AUTO_INCREMENT,
  `entity_id_to` INTEGER NULL,
  `type` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`entity_id_from`)
);

-- ---
-- Table 'Source_Type'
-- 
-- ---

DROP TABLE IF EXISTS `Source_Type`;
        
CREATE TABLE `Source_Type` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Entity_Type'
-- 
-- ---

DROP TABLE IF EXISTS `Entity_Type`;
        
CREATE TABLE `Entity_Type` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Qualification'
-- 
-- ---

DROP TABLE IF EXISTS `Qualification`;
        
CREATE TABLE `Qualification` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Score'
-- 
-- ---

DROP TABLE IF EXISTS `Score`;
        
CREATE TABLE `Score` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Relation_Type'
-- 
-- ---

DROP TABLE IF EXISTS `Relation_Type`;
        
CREATE TABLE `Relation_Type` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Action_Type'
-- 
-- ---

DROP TABLE IF EXISTS `Action_Type`;
        
CREATE TABLE `Action_Type` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Role_Type'
-- 
-- ---

DROP TABLE IF EXISTS `Role_Type`;
        
CREATE TABLE `Role_Type` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Category'
-- 
-- ---

DROP TABLE IF EXISTS `Category`;
        
CREATE TABLE `Category` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Rates` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkup` (`id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (user_id) REFERENCES `Checkup_User` (`user_id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (qualification) REFERENCES `Qualification` (`id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (score) REFERENCES `Score` (`id`);
ALTER TABLE `Entity` ADD FOREIGN KEY (id) REFERENCES `Entity_Relation` (`entity_id_from`);
ALTER TABLE `Entity` ADD FOREIGN KEY (type) REFERENCES `Entity_Type` (`id`);
ALTER TABLE `Source` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkup` (`id`);
ALTER TABLE `Source` ADD FOREIGN KEY (source_entity_id) REFERENCES `Entity` (`id`);
ALTER TABLE `Source` ADD FOREIGN KEY (type) REFERENCES `Source_Type` (`id`);
ALTER TABLE `Checkup_User` ADD FOREIGN KEY (user_id) REFERENCES `User` (`id`);
ALTER TABLE `Checkup_User` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkup` (`id`);
ALTER TABLE `Quote` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkup` (`id`);
ALTER TABLE `Quote` ADD FOREIGN KEY (author) REFERENCES `Entity` (`id`);
ALTER TABLE `Quote` ADD FOREIGN KEY (category_id) REFERENCES `Category` (`id`);
ALTER TABLE `Context` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkup` (`id`);
ALTER TABLE `Entity_Relation` ADD FOREIGN KEY (entity_id_to) REFERENCES `Entity` (`id`);
ALTER TABLE `Entity_Relation` ADD FOREIGN KEY (type) REFERENCES `Relation_Type` (`id`);
ALTER TABLE `Action` ADD FOREIGN KEY (type) REFERENCES `Action_Type` (`id`);
ALTER TABLE `Comment` ADD FOREIGN KEY (input_id) REFERENCES `Input` (`id`);

-- ---
-- Table Properties
-- ---

 ALTER TABLE `Checkup` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Rates` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entity` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Source` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Checkup_User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Quote` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Context` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Source_Type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entity_Type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Qualification` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Score` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entity_Relation` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Action` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Relation_Type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Action_Type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Role_Type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Comment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Category` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Input` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Checkup` (`id`,`status`,`phase`,`fork_from`) VALUES
-- ('','','','');
-- INSERT INTO `Rates` (`id`,`checkup_id`,`user_id`,`qualification`,`score`) VALUES
-- ('','','','','');
-- INSERT INTO `Entity` (`id`,`name`,`description`,`type`) VALUES
-- ('','','','');
-- INSERT INTO `Source` (`id`,`checkup_id`,`source_entity_id`,`type`,`what`,`checked`,`observation`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Checkup_User` (`user_id`,`checkup_id`,`role_id`) VALUES
-- ('','','');
-- INSERT INTO `Quote` (`id`,`checkup_id`,`text`,`author`,`where`,`when`,`category_id`,`rate`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `User` (`id`,`provider`,`provider_id`,`mail`,`picture`) VALUES
-- ('','','','','');
-- INSERT INTO `Context` (`id`,`checkup_id`,`body`,`tags`) VALUES
-- ('','','','');
-- INSERT INTO `Source_Type` (`id`) VALUES
-- ('');
-- INSERT INTO `Entity_Type` (`id`) VALUES
-- ('');
-- INSERT INTO `Qualification` (`id`) VALUES
-- ('');
-- INSERT INTO `Score` (`id`) VALUES
-- ('');
-- INSERT INTO `Entity_Relation` (`entity_id_from`,`entity_id_to`,`type`) VALUES
-- ('','','');
-- INSERT INTO `Action` (`id`,`made_by`,`type`,`on`) VALUES
-- ('','','','');
-- INSERT INTO `Relation_Type` (`id`) VALUES
-- ('');
-- INSERT INTO `Action_Type` (`id`) VALUES
-- ('');
-- INSERT INTO `Role_Type` (`id`) VALUES
-- ('');
-- INSERT INTO `Comment` (`id`,`input_id`) VALUES
-- ('','');
-- INSERT INTO `Category` (`id`) VALUES
-- ('');
-- INSERT INTO `Input` (`id`,`type`,`refers_to`,`text`) VALUES
-- ('','','','');


