const { readdirSync } = require('fs');
const Discord = require('discord.js');

module.exports = async client => {
    let count = 0;
    const dirsEvents = readdirSync("./events/");

    for (const dirs of dirsEvents) {
        const filesDirs = readdirSync(`./events/${dirs}/`).filter(f => f.endsWith(".js"));
        for (const files of filesDirs) {
            const event = require(`../events/${dirs}/${files}`);
            client.on(event.name(Discord.Events), (...args) => event.run(Discord, client, ...args));
            count++;
        };
    };

    console.log(`[LOGS] `.blue + `Loaded ${count} events!`.green);
}