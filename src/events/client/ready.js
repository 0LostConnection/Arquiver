const Event = require(`${process.cwd()}/src/infra/structures/Event`)

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async (interaction) => {

        console.log(`
Status          Online
Nome            ${this.client.user.tag}
Servidores      ${this.client.guilds.cache.size}
        `)

        this.client.registerCommands()
        await this.client.connectToDatabase()
    }
}