const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
const { execute } = require("../../Events/Client/ready");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "Menampilkan Status Client Dan Koneksi Database",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Client**: \` 🟢 Online \` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Database**: \`${switchTo(connection.readyState)}\``)

        interaction.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    var status = " "
    switch(val) {
        case 0 : status = `🔴 Disconnected`
        break;
        case 1 : status = `🟢 Connected`
        break;
        case 2 : status = `🟠 Connecting`
        break;
        case 3 : status = `🟣 Disconnecting`
        break;
    }
    return status
}