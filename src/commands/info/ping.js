const Command = require(`${process.cwd()}/src/infra/structures/Command`)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Pong!',
        })
    }

    run = (interaction) => {
        interaction.reply({ content: `🏓 Pong!\n\<:network:951113749710897153> Latencia: \`${this.client.ws.ping}ms\`` })
    }
}