const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");
const arrayOfStatus = [
    'Bot Official Of Rumah Kedua.',
    'Slash Command',
    'Join My Server : https://discord.gg/qnsRSa6p3m'
]

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
    */
    execute(client) {
        console.log("Rumah Kedua Is Now Ready")
        setInterval(() => {
            client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)]}], status: "idle"})
        }, 4000)

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Rumah Kedua Is Now Connected To The Database!")
        }).catch((err) => {
            console.log(err)
        })
    }
}