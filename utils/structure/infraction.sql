CREATE TABLE `infractions` (
    id INT AUTO_INCREMENT,
    `guild_id` VARCHAR(255),
    `user` VARCHAR(255),
    `count` INT(11),
    PRIMARY KEY (id)
);