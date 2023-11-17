const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Replies with Pong!')
        .setDMPermission(true),

    inwork: false,
    developerCommand: false,

    run: async (Discord, interaction) => {
        const time = Date.now();
        await interaction.reply({ content: "Pinging...", fetchReply: true });

        interaction.editReply({ content: `Pong! (${Date.now() - time}ms)` });
    }
}