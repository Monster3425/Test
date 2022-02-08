const {
    Client,
    CommandInteraction
} = require('discord.js');

module.exports = {
    name: "road-race",
    description: "road race game for fun",
    options: [{
        name: 'opponent',
        description: 'choose your opponent',
        type: 'USER',
        required: true
    }],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} message
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const opponent = message.options.getUser('opponent');
        const positions = {
            first: ':checkered_flag::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::checkered_flag:',
            second: `                              :red_car: - <@${message.user.id}>`,
            third: `                              :blue_car: - <@${opponent.id}>`,
            fourth: ':checkered_flag::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::checkered_flag:',
        };
        const blue = String(Math.random());
        const red = String(Math.random());

        positions.second = positions.second.split('');
        positions.third = positions.third.split('');

        const speed = 2;

        const data = {
            first: 30,
            second: 30
        };

        const componentsArray = [{
            type: 1,
            components: [{
                    type: 2,
                    style: 'PRIMARY',
                    custom_id: blue,
                    emoji: {
                        name: '🚙'
                    },
                },
                {
                    type: 2,
                    style: 'DANGER',
                    custom_id: red,
                    emoji: {
                        name: '🚗'
                    },
                },
            ],
        }, ];

        const msg = await message.followUp({
            content: positions.first + '\n' + positions.second.join('') + '\n' + positions.third.join('') + '\n' + positions.fourth,
            components: componentsArray,
        });

        const filter = (button => {
            return button.user.id === message.user.id || button.user.id === opponent.id;
        });
        const game = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'BUTTON',
        });

        function update(win, who) {
            if (win === true) {
                game.stop();
                componentsArray[0].components[0].disabled = true;
                componentsArray[0].components[1].disabled = true;

                message.channel.send(`GG ${who.username} Won`);
            }

            msg.edit({
                content: positions.first + '\n' + positions.second.join('') + '\n' + positions.third.join('') + '\n' + positions.fourth,
                components: componentsArray,
            });
        }

        game.on('collect', async button => {
            button.deferUpdate();
            for (let i = 0; i < speed; i++) {
                if (button.customId === blue && button.user.id === opponent.id) {
                    data.second--;
                    if (i === speed - 1) data.second === 0 ? update(true, opponent) : update();
                    positions.third.shift();
                } else if (button.user.id === message.user.id && button.customId === red) {
                    data.first--;
                    if (i === speed - 1) data.first === 0 ? update(true, message.user) : update();
                    positions.second.shift();
                }
            }
        });
    },
};