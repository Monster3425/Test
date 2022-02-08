const {
    Client,
    CommandInteraction
} = require('discord.js');
const ms = require('ms');
const messages = require('../../util/message');

module.exports = {
    name: 'start',
    description: 'starts a giveaway',
    options: [{
            name: 'duration',
            description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to start the giveaway in',
            type: 'CHANNEL',
            channelType: ["GUILD_TEXT"],
            required: true
        },
    ],
    permissions: ["MANAGE_MESSAGES"],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const duration = ms(interaction.options.getString('duration'));
        const winners = interaction.options.getNumber('winners');
        const prize = interaction.options.getString('prize');
        const channel = interaction.options.getChannel('channel');
        client.giveawaysManager.start(channel, {
            duration,
            winnerCount: winners,
            prize,
            hostedBy: interaction.member,
            messages,
        });

        interaction.followUp({content: `Giveaway Started in ${channel}`})
    },
};