module.exports = {
    name: (Events) => {
        return Events.MessageDelete;
    },

    run: async (Discord, client, interaction) => {
        let message = interaction;
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        let guild = client.guilds.cache.get(message.guildId);

        console.log(`[LOGS] `.blue + `Message deleted in ${guild.name} (${guild.id}), message: ${message}`.green);
    }
}