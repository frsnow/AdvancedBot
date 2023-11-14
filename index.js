const { Client, IntentsBitField, Collection } = require('discord.js');
const client = new Client({
    intents: new IntentsBitField(3276799),
})
const loadEvents = require("./interfaces/IEvents");
const loadCommands = require("./interfaces/ICommand");
require('dotenv').config();

client.commands = new Collection();

(async () => {
    await loadEvents(client);
    await loadCommands(client);
    await client.login(process.env.TOKEN);
})();