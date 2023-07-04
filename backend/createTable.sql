CREATE TABLE `api_air_temp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_id` varchar(45) DEFAULT NULL,
  `device_id` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `server_requested_time` varchar(100) DEFAULT NULL,
  `timestamp_in_response` varchar(45) DEFAULT NULL,
  `item_station_id` varchar(45) DEFAULT NULL,
  `item_value` varchar(45) DEFAULT NULL,
  `api_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20400 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_humid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_id` varchar(45) DEFAULT NULL,
  `device_id` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `server_requested_time` varchar(100) DEFAULT NULL,
  `timestamp_in_response` varchar(45) DEFAULT NULL,
  `item_station_id` varchar(45) DEFAULT NULL,
  `item_value` varchar(45) DEFAULT NULL,
  `api_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20623 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_pm25` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `timestamp_in_response` varchar(100) DEFAULT NULL,
  `update_timestamp_in_response` varchar(100) DEFAULT NULL,
  `server_requested_time` varchar(100) DEFAULT NULL,
  `item_value` varchar(45) DEFAULT NULL,
  `api_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2506 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_psi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `server_requested_time` varchar(100) DEFAULT NULL,
  `timestamp_in_response` varchar(100) DEFAULT NULL,
  `update_timestamp_in_response` varchar(100) DEFAULT NULL,
  `item_value` varchar(45) DEFAULT NULL,
  `api_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3019 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `building` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `coord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `details` varchar(100) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `details` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contact` int DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





