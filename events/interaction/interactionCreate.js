const { Events, InteractionType } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,

    run (client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if (command) {
                if (command.inDevelopment) {
                    if (interaction.user.id === "1023706648193290292") {
                        command.run(interaction);
                        console.log(`Command ${interaction.commandName} executed (by ${interaction.user.tag}(${interaction.user.id})) in development mode`.red);
                    } else {
                        interaction.reply({ content: "This command is in development", ephemeral: true });
                    }
                } else {
                    command.run(interaction);
                }
            } else {
                console.log(`Command ${interaction.commandName} not found`);
            }
        }
    }
}