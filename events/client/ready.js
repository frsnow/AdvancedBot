const updateChannelStats = require("../../utils/functions/updateStats");
const config = require("../../utils/config");
require("colors");

module.exports = {
    name: (Events) => {
        return Events.ClientReady;
    },
    run: async (Discord, client) => {
        await client.application.commands.set(client.commands.map(command => command.data));
        const messageReady = `Client is ready on version ${config.Version}. Server count: ${client.guilds.cache.size} & User count: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`.grey;
        let activities = [
            `${client.guilds.cache.size} servers!`,
            `${client.channels.cache.size} channels!`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
            `AdvancedBot Ready`,
        ]

        setInterval(() => {
            let random = Math.floor(Math.random() * activities.length);
            client.user.setActivity(activities[random], { type: Discord.ActivityType.Watching });
        }, 5000)
        console.log("-".repeat(messageReady.length).grey)
        console.log("[LOGS] ".blue +messageReady);
        updateChannelStats(client);
    }
}