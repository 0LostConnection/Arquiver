const Command = require('../../infra/structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clipboard',
            description: 'Gera um link para poder copiar qualquer coisa para sua área de transferência.',
            options: [
                {
                    name: 'copiar',
                    description: 'Link ou mensagem que você deseja copiar para a área de transferência.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'mensagem',
                    description: 'Mensagem de aviso.',
                    type: 'STRING',
                    required: false
                }
            ]
        })
    }

    run = (interaction) => {
        const toCopy = interaction.options.getString('copiar')
        const alertMsg = interaction.options.getString('mensagem')
        const temp = (alertMsg !== null || alertMsg.length > 0) ? `https://lost-redirect.vercel.app/?copy=${toCopy}&alertText=${alertMsg}` : `https://lost-redirect.vercel.app/?copy=${toCopy}`

        interaction.reply({ content: encodeURI(temp), ephemeral: true })
    }
}