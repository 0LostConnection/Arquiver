const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
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
        //await this.client.connectToDatabase()
    }
}