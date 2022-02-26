const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite me to your server!",
    
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
      
        const Invite = new MessageEmbed()
        .setTitle("Invite Me!")
        .setDescription("Bot Official Dari Server Rumah Kedua. Gunakan Tombol Dibawah Untuk Mengundang Saya Ke Server Anda Atau Bergabung Dengan Server Kami!\n\nLove You ❤🧡💛💚💙💜🤎🖤🤍")
        .setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL())

        const cButtons = new MessageActionRow();
        cButtons.addComponents(
            new MessageButton().setURL("https://discord.com/api/oauth2/authorize?client_id=831070305031159848&permissions=8&scope=bot%20applications.commands").setLabel("Invite Me").setStyle("LINK"),
            new MessageButton().setURL("https://discord.gg/qnsRSa6p3m").setLabel("Support Server").setStyle("LINK"),
        );

        return interaction.reply({embeds: [Invite], components: [cButtons]})
        
    }
  };