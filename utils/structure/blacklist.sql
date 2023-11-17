IF NOT EXISTS CREATE TABLE `blacklist`(
    id INT AUTO_INCREMENT,
    `user_id` BIGINT(20) NOT NULL,
    `moderator` BIGINT(20) NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`)
)