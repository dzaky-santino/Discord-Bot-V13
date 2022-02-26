const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKsystem");

module.exports = {
    name: "afk",
    description: "Sistem AFK",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description: "Setel Status AFK",
            options: [
                {
                    name: "alasan",
                    type: "STRING",
                    description: "Alasan AFK",
                    required: true
                }
            ]
        },
        {
            name: "remove",
            type: "SUB_COMMAND",
            description: "Menghapus Status AFK",
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction

        const Embed = new MessageEmbed()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})});

        const afkAlasan = options.getString("alasan");

        try {

            switch(options.getSubcommand()) {
                case "set" : {
                    await DB.findOneAndUpdate(
                        {GuildID: guild.id, UserID: user.id},
                        {Status: afkAlasan, Time: parseInt(createdTimestamp / 1000)},
                        {new: true, upsert: true}
                    )

                    Embed.setColor("GREEN").setDescription(`Status AFK: ${afkAlasan}`);
                    return interaction.reply({embeds: [Embed], ephemeral: false})
                }
                case "remove" : {
                    await DB.deleteOne({GuildID: guild.id, UserID: user.id})
                    Embed.setColor("RED").setDescription(`Status Afk Kamu telah Dihapus`);
                    return interaction.reply({embeds: [Embed], ephemeral: false})
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
} 
