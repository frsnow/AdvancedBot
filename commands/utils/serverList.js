const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverlist')
        .setDescription('Get the server count of the bot'),

    developerCommand: true,

    async run(Discord, interaction) {
        const serverCountEmbed = new EmbedBuilder()
        .setTitle("Server count")
        .setDescription(`The bot is in ${interaction.client.guilds.cache.size} servers`)
        .setTimestamp();

        let guilds = interaction.client.guilds.cache.map(guild => guild);
        let guildInvites = await Promise.all(guilds.map(guild => 
            guild.invites.fetch().catch(() => 'No permission or no invites')
        ));
        serverCountEmbed.addFields(
            {
                name: "List of servers",
                value: await Promise.all(guilds.map(async (guild, index) => {
                    let owner;
                    try {
                        owner = await guild.fetchOwner();
                    } catch (error) {
                        console.error(`Failed to fetch owner for guild ${guild.name}: ${error}`);
                    }
                    let ownerName = owner ? owner.user.username : 'Unknown';
                    return `\`${guild.name}\`: ${ownerName} \n${guild.memberCount} members - (${guild.id}) \n[Discord Invite](https://discord.gg/${guildInvites[index].first().code})`;
                })).then((values) => values.join("\n")),
                inline: true
            },
        );

        let buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('previous')
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
        );

        await interaction.reply({ embeds: [serverCountEmbed], components: [buttons], ephemeral: true })
    }
}