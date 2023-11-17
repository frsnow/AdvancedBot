const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("The user to ban").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for banning the user")),

        inwork: true,
    run: async (Discord, interaction) => {
        const { channel, options } = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
    
        await member.ban({ reason: reason });

        const embed = new EmbedBuilder()
            .setDescription(`Successfully banned ${user} with reason \`${reason}\``)
            .setFooter({ text: `AdvancedBot`, iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        })
    }
}