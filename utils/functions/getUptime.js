async function getUptime(client) {
    let uptimeBot = client.uptime;
    let days = Math.floor(uptimeBot / 86400000);
    let hours = Math.floor(uptimeBot / 3600000) % 24;
    let minutes = Math.floor(uptimeBot / 60000) % 60;
    let seconds = Math.floor(uptimeBot / 1000) % 60;
    return `\`${days}d ${hours}h ${minutes}m ${seconds}s\``;
}

module.exports = getUptime;