const { SlashCommandBuilder } = require("discord.js");
const config = require("../../utils/config")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Show the user information")
        .addUserOption(option => 
            option.setName("target")
            .setDescription("The user to get the information from")
        ),

    run: async(Discord, interaction) => {
        let user = interaction.options.getUser("target") || interaction.user;
        if (!user) return interaction.reply({ content: "Please provide a valid user", ephemeral: true });

        let dateString = "<t:" + Math.floor(user.createdTimestamp / 1000) + ":F>"
        let guild = interaction.client.guilds.cache.get(config.Main_Guild.ID);
        let member = guild.members.cache.get(user.id);
        let isDiscordBotStaff = false;

        if (member) {
            isDiscordBotStaff = member.roles.cache.has(config.Main_Guild.StaffIDRole);
        }

        let embed = new Discord.EmbedBuilder()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setAuthor({ name: `User information: ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**Username:** ${user.username}\n**ID:** ${user.id}\n**Created at:** ${dateString}`)
            .addFields(
                {
                    name: "Bot",
                    value: user.bot ? config.Icons.Yes : config.Icons.No,
                    inline: true
                },
                {
                    name: "Bot Staff",
                    value: isDiscordBotStaff ? config.Icons.Yes : config.Icons.No,
                    inline: true
                }
            )
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [ embed ] });
    }
}