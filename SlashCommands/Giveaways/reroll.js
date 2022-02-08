const {
    Client,
    CommandInteraction
} = require('discord.js');

module.exports = {
    name: 'reroll',
    description: 'reroll giveaway',
    options: [{
        name: 'giveaway',
        description: 'The giveaway to reroll (message ID or prize)',
        type: 'STRING',
        required: true
    }],
    permisisons: ["MANAGE_MESSAGES"],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('giveaway');

        // try to found the giveaway with prize then with ID
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

        if (!giveaway.ended) {
            return interaction.followUp({
                content: 'The giveaway is not ended yet.',
            });
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageId)
            .then(() => {
                // Success message
                interaction.followUp('Giveaway rerolled!');
            })
            .catch((e) => {
                interaction.followUp({
                    content: e,
                });
            });
    }
}