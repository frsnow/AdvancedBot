const redditImageFetcher = require('reddit-image-fetcher');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDMPermission(false)
        .setDescription("Get a random meme from reddit"),

    run: async (Discord, interaction) => {
        let subreddits = ["dankmeme", "meme", "me_irl"];
        let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

        redditImageFetcher.fetch({
            type: 'meme',
            total: 1,
            subreddit: [subreddit]
        }).then(result => {
            let embed = new EmbedBuilder()
                .setImage(result[0].image)
                .setTitle(`From /r/${subreddit}`)
                .setURL(result[0].url)
                .setTimestamp()
                .setFooter({ text: `AdvancedBot`, iconURL: interaction.client.user .displayAvatarURL({ dynamic: true }) })

            return interaction.reply({ embeds: [embed] });
        });
    }
}