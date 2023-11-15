const { Events, EmbedBuilder } = require('discord.js');
const updateChannelStats = require("../../utils/functions/updateStats");
const config = require("../../utils/config");
const database = require("../../utils/structure/mysql");

module.exports = {
    name: (Events) => {
        return Events.GuildCreate;
    },

    run: async (Discord, client, guild) => {
        console.log(`[LOGS] `.blue + `Joined a new guild: ${guild.name}`.grey + ` have ${guild.memberCount} members (${guild.id})`.grey);
        console.log(`[UPDATE]`.yellow + ` Updating server count channel (${client.guilds.cache.size})`.grey)
        updateChannelStats(client);

        let channel = client.channels.cache.get(config.Main_GuildChannel.ChannelGuildAdd);
        if (!channel) return;
        let owner;
        try {
            owner = await guild.fetchOwner();
        } catch (error) {
            console.error('Failed to fetch guild owner:', error);
        }
        let ownerUsername = owner ? owner.user.username : 'Unknown';
        
        let embed = new EmbedBuilder()
            .setTitle("Joined a new guild")
            .setTimestamp()
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setFooter({ text: "AdvancedBot", iconURL: guild.iconURL({ dynamic: true }) })
            embed.setDescription(`\`\`\`diff\n+ ${guild.name} (${guild.id})\n\`\`\`The guild owner is ${ownerUsername} \nThe guild have ${guild.memberCount} members`)

        let buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("removeFromThisGuild_"+guild.id)
                .setLabel("Remove from this guild")
                .setStyle(Discord.ButtonStyle.Danger)
        )
        channel.send({ embeds: [embed], components: [ buttons ] });
        await database.query(`INSERT INTO guilds (guild_id, guild_name) VALUES (?, ?)`, [guild.id, guild.name]).then(() => {
            console.log(`[DATABASE] `.green + `Added guild ${guild.name} (${guild.id}) to database`.grey);
        })
    }
}