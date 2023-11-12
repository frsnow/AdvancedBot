const { Client, IntentsBitField, Collection } = require('discord.js');
const client = new Client({
    intents: new IntentsBitField(3276799)
})
const dotenv = require('dotenv');
dotenv.config();

client.commands = new Collection();
client.events = new Collection();

require("colors");
const messageReady = "Bot is ready to use!";

client.login(process.env.TOKEN).then(() => {
    console.log("[LOGS] ".blue +messageReady.green);
})