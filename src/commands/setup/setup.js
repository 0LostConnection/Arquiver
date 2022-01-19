const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            description: 'Configurar dados do servidor no bot.',
            requireDatabase: true,
            guildOnly: true,
            permissions: ['MANAGE_GUILD'],
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'canais',
                    description: 'Configuração do sistema de parcerias.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'canal_punicoes',
                            description: 'Configurar o canal onde a mensagem após a parceria será enviada.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
            ]
        })
    }

    run = (interaction) => {
        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/setup/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}