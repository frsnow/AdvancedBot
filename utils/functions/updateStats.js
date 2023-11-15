async function updateChannelStats(client) {
    let serverCountChannel = "1173700862774882365";
    let memberCountChannel = "1173701402476945538";
    let serverChannel = await client.channels.cache.get(serverCountChannel);
    let memberChannel = await client.channels.cache.get(memberCountChannel);
    
    serverChannel.setName(`Total Servers: ${client.guilds.cache.size}`);
    memberChannel.setName(`Total Members: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`);
}

module.exports = updateChannelStats;