const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "hug",
    description: "Gives you a picture of an anime hug.",
    //Permission: "ADMINISTRATOR",
    /**
     * 
     * @param { MessageEmbed } message
     * @param { CommandInteraction } interaction
     */
    async execute(interaction) {

        const url = "https://some-random-api.ml/animu/hug";

        let data, response;

        try{
            response = await axios.get(url);
            data = response.data;
        }catch (e) {
            return interaction.channel.send(`An error occured, please try again!`)
        }

        const dog = new MessageEmbed()
        .setTitle("Random Anime Hug")
        .setImage(data.link)

        await interaction.reply({ embeds: [dog]}) //.then(msg => { setTimeout(() => msg.delete(), 10000) })
    }
}
