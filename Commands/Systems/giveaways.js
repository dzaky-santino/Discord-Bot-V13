const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "giveaways",
    description: "Pasang Giveaway",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: "start",
            description: "Mulai Giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Berikan Durasi Untuk Giveaway Ini (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "Pilih Jumlah Pemenang Untuk Giveaway Ini",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Sebutkan Nama Hadiahnya",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Pilih Channel Untuk Mengirim Hadiah",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    //required: false
                }
            ]
        },
        {
            name: "actions",
            description: "Pilihan Untuk Giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Pilih Opsi",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        }
                    ]
                },
                {
                    name: "message-id",
                    description: "Berikan Id Message dari Giveaway",
                    type: "STRING",
                    required: true

                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const {options} = interaction;
        const Sub = options.getSubcommand();
        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {
                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration"); 
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
                        giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
                        inviteToParticipate: 'Pencet Emoji <a:congrats:797761650559287297> Untuk Berpastisipasi!',
                        winMessage: 'Selamat!, {winners}! Kamu Menang **{this.prize}**!',
                    }
                }).then(async () => {
                    successEmbed.setDescription("Giveaway Berhasil Dimulai")
                    return interaction.reply({embeds: [successEmbed], ephemeral: true});
                }).catch((err) => {
                    errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                })
            }
            break;

            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");  
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);
                
                if (!giveaway) {
                    errorEmbed.setDescription(`Tidak Dapat Menemukan Giveaway Dengan Message-Id: ${messageId} Di Server Ini`);
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                }
                switch(choice) {
                    case "end" : {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription("Giveaway Has Been Ended");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "pause" : {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription("Giveaway Has Been Paused");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "unpause" : {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription("Giveaway Has Been Unpaused");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "reroll" : {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription("Giveaway Has Been Rerolled");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "delete" : {
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription("Giveaway Has Been Deleted");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Terjadi Kesalahan\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;
                }
            }
            break;

            default : {
                console.log("Error In The Giveaway Command")
            }
        }
    }
}