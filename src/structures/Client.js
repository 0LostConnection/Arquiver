const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

const { connect } = require('mongoose')
const Models = require('../database/models/Models')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()

    }
    registerCommands() {
        //this.guilds.cache.get('826168701987455016').commands.set(this.commands)
        //this.guilds.cache.get('470988640911360020').commands.set(this.commands)
        this.application.commands.set(this.commands)
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)
                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    async connectToDatabase() {
        const connection = await connect('mongodb+srv://Geovane:geovane200605@robsonmorcego.ltlgk.mongodb.net/bot?retryWrites=true&w=majority')

        console.log('\x1b[32m%s\x1b[0m', 'Banco de dados conectado com sucesso!')

        this.db = { connection, ...Models }
    }
}