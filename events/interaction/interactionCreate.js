const Discord = require("discord.js");
const config = require("../../utils/config");

module.exports = {
    name: (Events) => {
        return Events.InteractionCreate;
    },

    run: (Discord, client, interaction) => {
        let allDevelopers;
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if (command) {
                for (let i = 0; i < config.MainDeveloper.length; i++) {
                    if (interaction.user.id === config.MainDeveloper[i]) {
                        allDevelopers = config.MainDeveloper[i];
                    }
                }
                
                if (command.inwork && interaction.user.id !== allDevelopers) {
                    interaction.reply({ content: "This command is in development", ephemeral: true });
                    console.log(`Command ${interaction.commandName} is in development`);
                } else if (command.developerCommand && interaction.user.id !== allDevelopers) {
                    interaction.reply({ content: "This command is only for developers", ephemeral: true });
                    console.log(`Command ${interaction.commandName} is only for developers`);
                } else {
                    command.run(Discord, interaction);
                }
            } else {
                console.log(`Command ${interaction.commandName} not found`);
            }
        }
    }
};