const client = require("../index");
const logsChannel = "886906479414759444"; // this is even correct or not
const { MessageEmbed } = require("discord.js");

client.on("guildCreate", async (guild) => {
  client.channels.cache.get(logsChannel).send({
    embeds: [
      new MessageEmbed()
        .setTitle(`Added To New Server`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(`Guild`, "" + guild.name + " / " + guild.id)
        .setColor("GREEN")
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
