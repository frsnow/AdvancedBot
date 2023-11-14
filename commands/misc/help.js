const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show the help message"),

    inDevelopment: true,

    async run(Discord, interaction) {
        
        let helpEmbed = new EmbedBuilder()
            .setTitle("Command Information")
            .setDescription("Here is the list of all the commands, and their information.")
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setFooter({ text: `${interaction.client.user.username} © 2023`, iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp()

        let commands = interaction.client.commands;
        commands.forEach(command => {
            helpEmbed.addFields({
                name: command.data.name.charAt(0).toUpperCase() + command.data.name.slice(1),
                value: `\`Description:\` ${command.data.description}` + `\n\`Is in developement:\` ` + (command.inDevelopment ? `<:yes_check:1173781550433833040>` : `<:no_check:1173781592607572039>`),
                inline: true
            });
        });

        let actionsRows = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Documentation")
                .setURL("https://discord.gg/6hUC8Qnbae")
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setLabel("Invite")
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1173721637984665610&permissions=8&scope=bot%20applications.commands")
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
                .setLabel("Support")
                .setURL("https://discord.gg/6hUC8Qnbae")
                .setStyle(ButtonStyle.Link)
        );


        await interaction.reply({ 
            embeds: [ helpEmbed ], 
            components: [ actionsRows ], 
            ephemeral: true 
        });
    }
}