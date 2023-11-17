const { Client, IntentsBitField, Collection } = require('discord.js');
const client = new Client({
    intents: new IntentsBitField(3276799),
    shards : [0, 1, 2],
    shardCount : 3 
})
require('dotenv').config();
const loadEvents = require("./interfaces/IEvents");
const loadCommands = require("./interfaces/ICommand");
const updateChannelStats = require("./utils/functions/updateStats");

client.commands = new Collection();
client.subCommands = new Collection();

(async () => {
    await loadEvents(client);
    await loadCommands(client);
    await client.login(process.env.TOKEN);
    setInterval(() => {
        updateChannelStats(client);
    }, 1000 * 60 * 25)
})();