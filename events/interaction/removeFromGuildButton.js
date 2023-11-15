module.exports = {
    name: (Events) => {
        return Events.InteractionCreate;
    },

    run: (Discord, client, interaction) => {
        if (interaction.type === Discord.InteractionType.MessageComponent) {
            if (interaction.customId.startsWith("removeFromThisGuild_")) {
                let guildId = interaction.customId.split("removeFromThisGuild_")[1];
                let guild = client.guilds.cache.get(guildId);
                if (!guild) return;
                guild.leave();
                interaction.reply({ content: "Successfully left guild", ephemeral: true });
            }
        }
    }
}