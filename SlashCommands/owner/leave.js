const { Client, CommandInteraction } = require("discord.js");
const owner = require("../../config.json").owner;

module.exports = {
  name: "leave",
  description: "leave the guild which id is provided (owner only)",
  options: [
    {
      name: "guildid",
      description: "provide a guild id which you want to remove",
      type: "STRING",
      required: true,
    },
    {
        name: 'reason',
        description: 'reason bruh',
        type: 'STRING',
        required: true,
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (interaction.user.id != owner)
      return interaction.followUp(
        `<a:_cross:725303285015117844> Developer Only <a:_cross:725303285015117844>`
      );
    try {
      let id = interaction.options.getString("guildid");
      let reason = interaction.options.getString("reason");
      const lguild = client.guilds.cache.get(id);
      const guildowner = (await lguild.fetchOwner()).user.tag;
      client.user.cache.get(guildowner).send(reason);
      if (!id)
        interaction.followUp({
          content: "Please secify an id",
        });
      lguild.leave().then((g) => console.log(`Left ${g}`));
      interaction.followUp({
        content: "Leaved Successfully",
      });
    } catch (err) {
      interaction.followUp(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  },
};
