const { EmbedBuilder } = require('discord.js');
const getUptime = require('./getUptime.js');


async function createUptime(client) {
    let uptime = await getUptime(client);


    /// delete message if already exists
    let channel = client.channels.cache.get('1173820344952438814');
    let messages = await channel.messages.fetch({ limit: 100 });
    let botMessages = messages.filter(m => m.author.id === client.user.id);
    if (botMessages.size > 0) {
        await channel.bulkDelete(botMessages);
    }

    const embed = new EmbedBuilder()
    embed.setAuthor({ name: "Uptime", iconURL: client.user.displayAvatarURL()  })
    embed.setDescription(`View the uptime of the bot\nUptime: ${uptime}`)
    embed.setThumbnail(client.user.displayAvatarURL())
    embed.setFooter({ text: "AdvancedBot", iconURL: client.user.displayAvatarURL() })

    let msg = await channel.send({ embeds: [embed] })

    setInterval(async () => {
        let uptime = await getUptime(client);
        embed.setDescription(`View the uptime of the bot\nUptime Bot: \`${uptime}\``)
        embed.setFooter({ text: `AdvancedBot | Last update : ${new Date().toLocaleString()}`, iconURL: client.user.displayAvatarURL() })
        msg.edit({ embeds: [embed] })
    }, 5000)

    console.log(`[LOGS] `.blue +`Create the uptime in channel [${channel.id}]`.grey)
}

module.exports = createUptime;