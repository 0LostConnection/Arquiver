const Event = require(`${process.cwd()}/src/infra/structures/Event`)

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        const cmd = this.client.commands.find(c => c.name === interaction.commandName)
        
        try {
            if (cmd) cmd.run(interaction)
        }
        catch (e) {
            console.log(e)
        }
    }
}