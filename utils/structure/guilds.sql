CREATE TABLE `guilds` (
    `guild_id` varchar(255) NOT NULL,
    `guild_name` varchar(255) NOT NULL,
    `suspicious_level` tinyint(1) NOT NULL DEFAULT '0',
    `setup` tinyint(1) NOT NULL DEFAULT '0',
    `log_channel` varchar(255) DEFAULT NULL,
    ;
)