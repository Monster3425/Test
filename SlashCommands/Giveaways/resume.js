const {
    Client,
    CommandInteraction
} = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'resume giveaways',
    options: [{
        name: 'giveaway',
        description: 'The giveaway to resume (message ID or giveaway prize)',
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

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.followUp({
                content: 'This giveaway is not paused.',
            });
        }

        // Edit the giveaway
        client.giveawaysManager.unpause(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.followUp('Giveaway unpaused!');
            })
            .catch((e) => {
                interaction.followUp({
                    content: e,
                });
            });
    }
}