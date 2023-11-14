const { Events, EmbedBuilder } = require('discord.js');
const updateChannelStats = require("../../utils/functions/updateStats");

module.exports = {
    name: Events.GuildCreate,

    run: (client, guild) => {
        console.log(`[LOGS] `.blue + `Joined a new guild: ${guild.name}`.grey + ` have ${guild.memberCount} members (${guild.id})`.grey);
        console.log(`[UPDATE]`.yellow + ` Updating server count channel (${client.guilds.cache.size})`.grey)
        updateChannelStats(client);

        let channel = client.channels.cache.get(config.Main_GuildChannel.ChannelGuildAdd);
        if (!channel) return;

        TODO: "Add embed for v1.0.2"
    }
}