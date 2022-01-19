const Event = require('../../structures/Event')
const activities_list = ["Utilize \"/\" para ver meus comandos!", "discord.gg/ubkwvj9Q9n", "Tenha um ótimo dia! :)"]

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
            this.client.user.setActivity(activities_list[index], { type: 'LISTENING' })
        }, 20000)

        console.log(`\nStatus          Online\nName            ${this.client.user.tag}\nServidores      ${this.client.guilds.cache.size}`)

        this.client.registerCommands()
        await this.client.connectToDatabase()        
    }
}