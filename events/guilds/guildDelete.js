const { Events, EmbedBuilder } = require('discord.js');
const updateChannelStats = require('../../utils/functions/updateStats');
const config = require("../../utils/config");

module.exports = {
    name: Events.GuildDelete,

    run: (client, guild) => {
        console.log(`[LOGS] `.blue + `Left a guild: ${guild.name}`.grey + ` have ${guild.memberCount} members (${guild.id})`.grey);
        console.log(`[UPDATE]`.yellow + ` Updating server count channel (${client.guilds.cache.size})`.grey)
        updateChannelStats(client);


        let channel = client.channels.cache.get(config.Main_GuildChannel.ChannelGuildRemove);
        if (!channel) return;

        TODO: "Add embed for v1.0.2"
    }
}