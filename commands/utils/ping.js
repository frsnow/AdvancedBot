const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Replies with Pong!')
        .setDMPermission(true),

    inDevelopment: false,

    async run (interaction) {
        await interaction.reply("The bot have a ping of " + interaction.client.ws.ping + "ms!");
    }
}