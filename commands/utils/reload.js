const { SlashCommandBuilder } = require("discord.js");
const loadEvents = require("../../interfaces/IEvents");
const loadCommands = require("../../interfaces/ICommand");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload a event")
        .addSubcommand(subcommand => subcommand
            .setName("event")
            .setDescription("Reload a event")
        )
        .addSubcommand(subcommand => subcommand
            .setName("command")
            .setDescription("Reload a command")
        ),

    developerCommand: true,

    run: async (Discord, interaction) => {
        let { options } = interaction;

        if (options.getSubcommand() === "event") {
            loadEvents(interaction.client);
        } else if (options.getSubcommand() === "command") {
            loadCommands(interaction.client);
        }
    }
}