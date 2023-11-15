const { EmbedBuilder } = require('discord.js');
const updateChannelStats = require('../../utils/functions/updateStats');
const config = require("../../utils/config");
const database = require("../../utils/structure/mysql");

module.exports = {
    name: (Events) => {
        return Events.GuildDelete;
    },

    run: async (Discord, client, guild) => {
        console.log(`[LOGS] `.blue + `Left a guild: ${guild.name}`.grey + ` have ${guild.memberCount} members (${guild.id})`.grey);
        console.log(`[UPDATE]`.yellow + ` Updating server count channel (${client.guilds.cache.size})`.grey)
        updateChannelStats(client);


        let channel = client.channels.cache.get(config.Main_Guild.ChannelLogs.ChannelGuildRemove);
        if (!channel) return;

        let embed = new EmbedBuilder()
            .setTitle(`Left a guild`)
            .setTimestamp()
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setFooter({ text: "AdvancedBot", iconURL: guild.iconURL({ dynamic: true }) })
            embed.setDescription(`\`\`\`diff\n- ${guild.name} (${guild.id})\n\`\`\`The guild have ${guild.memberCount} members`)

        channel.send({ embeds: [embed] })
        await database.query(`DELETE FROM guilds WHERE guild_id = ?`, [guild.id]).then(() => {
            console.log(`[DATABASE] `.green + `Removed guild ${guild.name} (${guild.id}) from database`.grey);
        })
    }
}