const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addStringOption(option => 
            option.setName("userid")
            .setDescription("The user for unban (ID)")
            .setRequired(true)
        ),

    run: async (Discord, interaction) => {
        const { channel, options } = interaction;

        const userId = options.getString("target");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new Discord.EmbedBuilder()
                embed.setDescription(`Successfully unbanned id ${userId} from the guild.`)
                embed.setColor(0x5fb041)

            await interaction.reply({ 
                embeds: [embed] 
            })
        } catch(err) {

            const errEmbed = new Discord.EmbedBuilder()
                errEmbed.setDescription(`Please provide a valid member's ID or is not banned.`)
                errEmbed.setColor(0xc72c3b)

            await interaction.reply({ 
                embeds: [errEmbed],
                ephemeral: true
            })
        }
    }
}