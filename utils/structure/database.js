const sqlite3 = require("sqlite3")
const config = require("../../utils/config");

async function createData(client) {
    database = new sqlite3.Database("./utils/structure/database.sqlite");
    const messageReady = `Client startup on version (${config.Version}). Server count: ${client.guilds.cache.size} & User count: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`.grey;

    if (database) {
        console.log("-".repeat(messageReady.length).grey)
        console.log("[LOGS] ".blue + "Connected to the database".grey);
        console.log("[LOGS] ".blue +messageReady);
    } else {
        console.log("[LOGS] ".blue + "Failed to connect to the database".red);
    }
}

module.exports = createData;