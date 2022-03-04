const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

require('dotenv').config()

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    registerCommands() {
        //this.guilds.cache.get('470988640911360020').commands.set(this.commands)
        //this.application.commands.set(this.commands.filter(cmd => { cmd.Development === false}))
        this.guilds.cache.each(guild => {
            this.guilds.cache.get(guild.id).commands.set(this.commands)
        })
    }

    loadCommands(path = 'src/commands') {
        const cmdsCategories = readdirSync(path)

        for (const category of cmdsCategories) {
            const commandList = readdirSync(`${path}/${category}`)
            
            for (const command of commandList) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                if (cmd.disable) continue
                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const evtsCategories = readdirSync(path)

        for (const category of evtsCategories) {
            const eventsList = readdirSync(`${path}/${category}`)

            for (const event of eventsList) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
}