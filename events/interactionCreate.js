const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({
            ephemeral: false
        }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({
                content: "An error has occured "
            });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options ?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);


        if (cmd) {
            if (!interaction.member.permissions.has(cmd.permissions || [])) {
                interaction.followUp({
                    content: "Invalid permissions. You need " + cmd.permissions,
                });
            } else {
                cmd.run(client, interaction, args);
            }
        }
    }

    // Context Menu Handling
    const args = [];

    if (interaction.isContextMenu()) {
        await interaction.deferReply({
            ephemeral: true
        });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction, args);
    }
});