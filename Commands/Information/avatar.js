const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Membuka Avatar",
    options: [
        {
            name: "target",
            type: "USER",
            description: "Membuka Avatar User",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setColor("RANDOM")
        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
        .setDescription(`[Png](${user.avatarURL({format: 'png'})}) | [webp](${user.avatarURL({dynamic: true})}) | [Jpg](${user.avatarURL({format: 'jpg'})})`)
        .setFooter({text: `Member ID: ${user.id}`});

        interaction.reply({embeds: [embed]})
    },
}

// const { CommandInteraction, Client, MessageEmbed} = require("discord.js");
// const fetch = require("axios");

// module.exports = {
//     name: "avatar",
//     description: "Membuka Avatar",
//     options: [
//         {
//             name: "user",
//             type: "SUB_COMMAND",
//             description: "Membuka Avatar User",
//             options: [{
//                 name: 'target',
//                 description: "The Person that you want to get their avatar",
//                 type: "USER",
//                 required: false
//             }]
//         },
//         {
//             name: "member",
//             type: "SUB_COMMAND",
//             description: "Membuka Avatar Member",
//             options: [{
//                 name: 'target',
//                 description: "The Person that you want to get their avatar",
//                 type: "MEMBER",
//                 required: false
//             }]
//         }
//     ],
//     /**
//      * 
//      * @param {CommandInteraction} interaction 
//      * @param {CLient} client 
//      */
//     async execute(interaction, client) {
//         const choices = interaction.options.getSubcommand()
//         let target = interaction.options.getMember('target')

//         if(choice === 'user') {
//             if(!target) target = interaction.user
//             const avatarEmbed = new MessageEmbed()
//             .setTitle(`${target.tag}`)
//             .setImage(target.displayAvatarURL({dynamic: true, size: 4096}))
//             .setColor("RANDOM")
//             interaction.reply({content: [avatarEmbed]})
//         }

//         else if(choice == 'member') {
//             let res = await fetch.get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${target.id}`, {
//                 Authorization: `Bot ${Client.Token}`
//             })

//             if(res.data.avatar !== undefined && res.data.avatar !== null) {
//                 let url = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${res.data.avatar}.webp?size=4096`
//                 const avatarEmbed = new MessageEmbed()
//                 .setTitle(`${target.tag}`)
//                 .setImage(url)
//                 .setColor("RANDOM")
//                 interaction.reply({content: [avatarEmbed]})
//             } else {
//                 const avatarEmbed = new MessageEmbed()
//                 .setTitle(`${target.tag}`)
//                 .setImage(target.displayAvatarURL({dynamic: true, size: 4096}))
//                 .setColor("RANDOM")
//                 interaction.reply({content: [avatarEmbed]})
//             }
//         }
//     }
// }