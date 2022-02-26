const { MessageEmbed, GuildMember } = require("discord.js");
const LeaveSetupData = require("../../Structures/Schemas/LeaveDB");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const { guild, user } = member;

        const Data = await LeaveSetupData.findOne({ GuildID: guild.id})
        if(!Data) return;

        const LeaveEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL({
                dynamic: true
            }),
        })
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setDescription(
        `${member} Telah Pergi Dari **${guild.name}**\n
        Bergabung: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nJumlah Member Tersisa: **${guild.memberCount}**`
        )
        .setFooter({text: `Akun ID: ${user.id}`})

        await guild.channels.cache
            .get(Data.Logs)
            .send({ embeds: [LeaveEmbed] });
    }
}

// const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

// module.exports = {
//     name: "guildMemberRemove",
//     /**
//      * 
//      * @param {GuildMember} member 
//      */
//     execute(member) {
//         const { user, guild } = member;

//         //member.roles.add("")
//         const Loger = new WebhookClient({
//             id: "944209623785820190",
//             token: "BfUP-gFiaQIXsW_k_gkwPx3FylqX7zt5FuYZJ_bAOSzjTiZU-nxKBsLvR13LsPBl2i6B"
//         });

//         const Welcome = new MessageEmbed()
//         .setColor("RED")
//         .setAuthor({name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
//         .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
//         .setDescription(`
//         ${member} Telah Pergi Dari **${guild.name}**\n
//         Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nJumlah Member Tersisa: **${guild.memberCount}**`)
//         .setFooter({text: `ID: ${user.id}`})

//         Loger.send({embeds: [Welcome]})
//     }
// }