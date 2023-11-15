const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const database = require("../../utils/structure/mysql");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("checkguild")
        .setDescription("Check if the guild in the database")
        .addStringOption(option =>
            option.setName('guild_id')
                .setDescription('The guild id to check')
                .setRequired(true)
        ),
        developerOnly: true,  

        run: async (Discord, interaction) => {
            let guild_id = interaction.options.getString('guild_id');
            let guild = await interaction.client.guilds.fetch(guild_id);
            let guild_owner = await guild.fetchOwner();


            let guild_check = await database.query(`SELECT * FROM guilds WHERE guild_id = ?`, [guild_id]);
            let guild_check_suspicious = await database.query(`SELECT * FROM guilds WHERE guild_id = ? AND suspicious_level > 0`, [guild_id]);
            if (guild_check.length < 1) {
                return interaction.reply({ content: `Guild not found in database`, ephemeral: true });
            } else {
                if (guild_check_suspicious.length < 1) {
                    guild_check_suspicious = [{ suspicious_level: "```diff\n+ Is Not Suspicious\n```" }]
                } else if (guild_check_suspicious[0].suspicious_level == 1) {
                    guild_check_suspicious = [{ suspicious_level: "```diff\n+ Low (1)\n```" }]
                } else if (guild_check_suspicious[0].suspicious_level == 2) {
                    guild_check_suspicious = [{ suspicious_level: "```diff\n- Suspicious Level: Medium (2)\n```" }]
                } else if (guild_check_suspicious[0].suspicious_level == 3) {
                    guild_check_suspicious = [{ suspicious_level: "```diff\n- High (3)\n```" }]
                }
                let embed = new EmbedBuilder()
                    .setTitle(`Guild Check`)
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hello i found the server in database look the information.\n- __Guild name__ : \`${guild.name}\`\n- __Guild id__ : \`${guild.id}\`\n- __Guild owner__ : \`${guild_owner.user.username} (${guild_owner.user.id})\`\n\n**Guild Suspicious Level:** ${guild_check_suspicious[0].suspicious_level}`)
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                return interaction.reply({ embeds: [embed], content: `Guild found in database`, ephemeral: true });
            }
        }
}