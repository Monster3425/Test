const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const color = require("../../config.json").color;

module.exports = {
  name: "ping",
  description: `Check client's ping!`,
  aliases: [""],
  emoji: "🏓",
  timeout: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId('primary')
      .setStyle('DANGER')
      .setLabel('Primary')
    )
    message.channel.send({ content: "Hellow World", components: [row] });
  },
};
