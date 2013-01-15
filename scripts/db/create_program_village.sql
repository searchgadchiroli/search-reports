Drop table if  exists jss_program_village;
CREATE TABLE `jss_program_village` (
  `program_village_id` int(11) NOT NULL AUTO_INCREMENT,
  `pv_name` varchar(255) DEFAULT NULL,
  `city_village` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`program_village_id`)

)