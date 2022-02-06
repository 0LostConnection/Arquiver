const Command = require(`${process.cwd()}/src/infra/structures/Command`)

module.exports = class extends Command {
    constructor(client) {
        super (client, {
            name: 'ping',
            description: 'Pong!',
            development: true
        })
    }

    run = (interaction) => {
        interaction.reply({ content: ':ping_pong: Pong!'})
    }
}