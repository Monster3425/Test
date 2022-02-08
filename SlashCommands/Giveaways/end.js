const {
    Client,
    CommandInteraction
} = require('discord.js');

module.exports = {
    name: 'end',
    description: 'ends a giveaway',
    options: [{
        name: 'giveaway',
        description: 'The giveaway to end (message ID or giveaway prize)',
        type: 'STRING',
        required: true
    }],

    permissions: ["MANAGE_MESSAGES"],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('giveaway');
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.followUp({
                content: 'Unable to find a giveaway for `' + query + '`.',
            });
        }

        if (giveaway.ended) {
            return interaction.followUp({
                content: 'This giveaway is already ended.',
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.followUp('Giveaway ended!');
            })
            .catch((e) => {
                interaction.followUp({
                    content: e,
                });
            });
    },
};