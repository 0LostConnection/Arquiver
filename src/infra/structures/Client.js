const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

require('dotenv').config()
const { connect } = require('mongoose')
const Models = require('../../database/Models')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    registerCommands() {
        this.guilds.cache.get('470988640911360020').commands.set(this.commands)
        //this.application.commands.set(this.commands.filter(cmd => { cmd.Development === false}))
    }

    loadCommands(path = 'src/commands') {
        const cmdsCategories = readdirSync(path)

        for (const category of cmdsCategories) {
            const commandsList = readdirSync(`${path}/${category}`)

            for (const command of commandsList) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))

                const cmd = new (commandClass)(this)
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

    async connectToDatabase() {
        const connection = await connect(process.env.DATABASE_URL)

        console.log('\x1b[32m%s\x1b[0m', 'Banco de dados conectado com sucesso!')

        this.db = { connection, ...Models }
    }
}