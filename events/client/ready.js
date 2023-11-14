require("colors");
const { Events, ActivityType } = require("discord.js");
const updateChannelStats = require("../../utils/functions/updateStats");
const createData = require("../../utils/structure/database");
const config = require("../../utils/config");

module.exports = {
    name: Events.ClientReady,
    async run (client) {

        await client.application.commands.set(client.commands.map(command => command.data));
        let activies = [
            `${client.guilds.cache.size} servers`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`
        ];
        let randomActivity = activies[Math.floor(Math.random() * activies.length)];

        setInterval(() => {
            client.user.setActivity(randomActivity, { type: ActivityType.Watching });
            updateChannelStats(client);
        }, 10000);

        createData(client);
    }
}