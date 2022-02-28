const Command = require(`${process.cwd()}/src/infra/structures/Command`)
const database = require(`${process.cwd()}/src/database/Database`)

module.exports = class extends Command {
    constructor(client) {
        super (client, {
            name: 'ping',
            description: 'Pong!',
            development: true
        })
    }

    run = async (interaction) => {
        interaction.reply({ content: ':ping_pong: Pong!'})
        
        const db = await database(interaction.guildId)
        //db.guild.channels.punishment = 123456
        await db.guild.save()
        db.disconnect()
    }
}