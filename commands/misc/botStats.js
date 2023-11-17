const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot-stats")
        .setDescription("Get the bot statistics"),

    run: async (Discord, interaction) => {
        let userCount = interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        let guildCount = interaction.client.guilds.cache.size;

        let embed = new Discord.EmbedBuilder()
        embed.setTitle("Bot Statistics")
        embed.setThumbnail(interaction.client.user.displayAvatarURL())
        embed.setDescription(`\`\`\`diff\n- AdvancedBot is a bot made by [Aklox]\n+ The bot is simply a bot to help you ALL on your discord server, enabling anti-raid, moderation and much more.\`\`\``)
        embed.addFields(
            {
                name: "Servers Count",
                value: guildCount.toString() + " totaly servers",
                inline: true
            },
            {
                name : "Users Count",
                value: userCount.toString() + " totaly users",
                inline: true
            },
        )

        await interaction.reply({ embeds: [embed] })
    }
}