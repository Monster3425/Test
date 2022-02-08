const client = require("../index");
const logsChannel = "858182785739128832";
const { MessageEmbed } = require("discord.js");

client.on("guildDelete", async (guild) => {
  client.channels.cache.get(logsChannel).send({
    embeds: [
      new MessageEmbed()
        .setTitle(`Removed From A Server`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(`Guild`, "" + guild.name + " / " + guild.id)
        .setColor("RED")
        .addField(`Members`, "" + guild.memberCount)
        .addField(
          `Humans`,
          "" + guild.members.cache.filter((u) => !u.user.bot).size
        )
        .addField(
          `Bots`,
          "" + guild.members.cache.filter((u) => u.user.bot).size
        )
        .addField(`Owner`, (await guild.fetchOwner()).user.tag),
    ],
  });
});
