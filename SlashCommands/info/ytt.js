const {
    Client,
    CommandInteraction
} = require('discord.js');
const discordTogether = require('../../Client/discord-together');

module.exports = {
    name: "together",
    description: "watch youtube together",
    options: [{
        name: 'channel',
        type: 'CHANNEL',
        description: 'choose a channel',
        channelType: ["GUILD_VOICE"],
        required: true
    }],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const [channelID] = args;
        const channel = interaction.guild.channels.cache.get(channelID);
        discordTogether.createTogetherCode(channelID, "youtube").then((x) => interaction.followUp(x.code));
    },
};