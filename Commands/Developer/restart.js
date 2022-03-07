const { CommandInteraction, Client } = require("discord.js");
const config = require("../../Structures/config.json");

module.exports = {
  name: "restart",
  description: "Restart Bot",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    if (!config.OwnerID.includes(member.id)) {
      return interaction.reply({
        content: "<a:Silang:944148235600146453> Anda Tidak Memiliki Izin Untuk Restart Bot",
      });
    }
    await interaction
      .reply({ content: "Restarting..." })
      .then(() => {
        client.destroy();
        console.log(
          `[Client] Restarting by ${member.user.username} in ${guild.name}`
        );
      })
      .then(() => {
        client.login(config.Token);
        console.log("[Client] Ready");
      });
  },
};
