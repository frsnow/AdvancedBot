const { SlashCommandBuilder } = require("discord.js");
const config = require("../../utils/config");
const getUptime = require("../../utils/functions/getUptime");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("Get information about the bot"),

    run: async (Discord, interaction) => {
        let botDescription = "The bot is simply a bot to help you ALL on your discord server, enabling anti-raid, moderation and much more."

        let embed = new Discord.EmbedBuilder()
        embed.setTitle("Bot Information")
        embed.setThumbnail(interaction.client.user.displayAvatarURL())
        embed.addFields(
            {
                name: "Bot Name",
                value: "AdvancedBot",
                inline: true
            },
            {
                name: "Bot Version",
                value: config.Version,
                inline: true
            },
            {
                name: "Bot Developer",
                value: "Aklox",
                inline: true
            },
            {
                name: "Uptime",
                value: "Loading...",
                inline: true
            },
            {
                name: "Library",
                value: "Discord.js" + " v" + Discord.version,
                inline: true
            },
        )
        embed.setFooter({ text: "AdvancedBot", iconURL: interaction.client.user.displayAvatarURL() })
        embed.setDescription(`\`\`\`diff\n- AdvancedBot is a bot made by [Aklox]\n+ ${botDescription}\`\`\``)

        await interaction.reply({ embeds: [embed] })

        setInterval(async () => {
            let uptime = await getUptime(interaction.client);
            embed.spliceFields(3, 1, {
                name: "Uptime",
                value: uptime,
                inline: true
            })
            interaction.editReply({ embeds: [embed] })
        }, 5000)
    }
}