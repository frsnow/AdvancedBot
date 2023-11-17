const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the server")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
            option.setName("user")
            .setDescription("The user to kick")
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("reason")
            .setDescription("The reason for kicking the user")
        ),

        inwork: true,
    run: async (Discord, interaction) => {
        const { channel, options } = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new Discord.EmbedBuilder() 
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new Discord.EmbedBuilder()
            .setDescription(`Successfully kicked ${user} witch reason: \`${reason}\``);

        const memberSendMessage = "You have been kicked from **" + interaction.guild.name + "** for the following reason: \n\`\`\`diff\n- " + reason + "\`\`\`\nIf you think this is a mistake, please contact the server moderators!";

        await user.send({ content: memberSendMessage }).catch(() => {});
        await interaction.reply({ 
            embeds: [embed] 
        });
    }
}