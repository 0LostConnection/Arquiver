const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
require('dotenv').config()

module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.commandsList = []
        this.loadCommands()
        this.loadEvents()
    }

    registerCommands() {
        //this.guilds.cache.get('470988640911360020').commands.set(this.commands)
        //this.application.commands.set(this.commands.filter(cmd => { cmd.Development === false}))
        this.guilds.cache.each(guildObject => {
            this.guilds.cache.get(guildObject.id).commands.set(this.commandsList)
        })
    }

    loadCommands(commandsCategoriesPath = 'src/commands') {
        const commandsCategories = readdirSync(commandsCategoriesPath)

        for (const category of commandsCategories) {
            const commandsFilesList = readdirSync(`${commandsCategoriesPath}/${category}`)
            
            for (const commandFile of commandsFilesList) {
                const commandClass = require(join(process.cwd(), `${commandsCategoriesPath}/${category}/${commandFile}`))
                const command = new (commandClass)(this)

                if (command.disable) continue
                this.commandsList.push(command)
            }
        }
    }

    loadEvents(eventsTypesPath = 'src/events') {
        const eventsCategories = readdirSync(eventsTypesPath)

        for (const category of eventsCategories) {
            const eventsFilesList = readdirSync(`${eventsTypesPath}/${category}`)

            for (const eventFile of eventsFilesList) {
                const eventClass = require(join(process.cwd(), `${eventsTypesPath}/${category}/${eventFile}`))
                const event = new (eventClass)(this)

                this.on(event.name, event.run)
            }
        }
    }
}