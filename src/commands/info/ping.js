const Command = require(`${process.cwd()}/src/infra/structures/CommandStructure`)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Pong!',
            ownerOnly: true,
            permissions: []
        })
    }

    run = (interaction) => {
        interaction.reply({ content: `🏓 Pong!\n\<:network:951113749710897153> Latencia: \`${this.client.ws.ping}ms\``, ephemeral: true})
    }
}