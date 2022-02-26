const { MessageEmbed, GuildMember } = require("discord.js");
const LeaveSetupData = require("../../Structures/Schemas/WelcomeDB");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const { guild, user } = member;

        const Data = await LeaveSetupData.findOne({ GuildID: guild.id})
        if(!Data) return;

        const WelcomeEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor({name: `${user.tag}`, iconURL: user.displayAvatarURL({dynamic: true})})
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(
          `
          **Selamat Datang** ${member} Di **${guild.name}**!\n
          **Akun Dibuat**: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
          **Akun ID**: || ${user.id} || \n
          **Jumlah Member Terbaru**: \`${guild.memberCount}\``
        )

        await guild.channels.cache
            .get(Data.Logs)
            .send({ embeds: [WelcomeEmbed] });
    }
}

// const { MessageEmbed, GuildMember } = require("discord.js");
// const WelcomeSetupData = require("../../Structures/Schemas/WelcomeDB"); /* Change {CHANGEME} to whatever you name the database */

// module.exports = {
//   name: "guildMemberAdd",
//   /**
//    *
//    * @param {GuildMember} member
//    */
//   async execute(member) {
//     const { user, guild } = member;

//     const Data = await WelcomeSetupData.findOne({ GuildID: guild.id });
//     if (!Data) return;

//     member.roles.add(`${Data.Role}`).catch((err) => {
//       console.log(err);
//     });

//     const WelcomeEmbed = new MessageEmbed()
//       .setColor("RANDOM")
//       .setAuthor({
//         name: `${user.tag}`,
//         iconURL: user.displayAvatarURL({
//           dynamic: true,
//         }),
//       })
//       .setThumbnail(
//         user.displayAvatarURL({
//           dynamic: true,
//           size: 512,
//         })
//       )
//       .setDescription(
//         `
//         **Welcome** ${member} to **${guild.name}**!\n
//         **Account Created**: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
// 		    **Account ID**: || ${user.id} || \n
//         **Latest Member Count**: \`${guild.memberCount}\``
//       )
//       .addFields(
//         {
//           name: "General",
//           value: `<#${Data.GeneralChannel}>`,
//           inline: true,
//         },
//         {
//           name: "Rules",
//           value: `<#${Data.RulesChannel}>`,
//           inline: true,
//         }
//       );

//     await guild.channels.cache
//       .get(Data.WelcomeChannel)
//       .send({ embeds: [WelcomeEmbed] });
//   },
// };




// const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

// module.exports = {
//     name: "guildMemberAdd",
//     /**
//      * 
//      * @param {GuildMember} member 
//      */
//     execute(member) {
//         const { user, guild } = member;

//         //member.roles.add("")
//         const Welcomer = new WebhookClient({
//             id: "944209623785820190",
//             token: "BfUP-gFiaQIXsW_k_gkwPx3FylqX7zt5FuYZJ_bAOSzjTiZU-nxKBsLvR13LsPBl2i6B"
//         });

//         const Welcome = new MessageEmbed()
//         .setColor("LIGHT_GREY")
//         .setAuthor({name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
//         .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
//         .setDescription(`
//         Selamat Datang ${member} Di **${guild.name}**\n
//         Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nJumlah Member Terbaru: **${guild.memberCount}**`)
//         .setFooter(`ID: ${user.id}`)

//         Welcomer.send({embeds: [Welcome]})
//     }
// }