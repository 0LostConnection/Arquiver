const CommandStructure = require(`${process.cwd()}/src/infra/structures/CommandStructure`)
const database = require(`${process.cwd()}/src/database/Database`)

module.exports = class extends CommandStructure {
    constructor(client) {
        super (client, {
            name: 'ping',
            description: 'Pong!',
            disable: true
        })
    }

    run = async (interaction) => {
        interaction.reply({ content: '🏓 Pong!'})
        
        const db = await database(interaction.guildId)
        //db.guild.channels.punishment = 123456
        await db.guild.save()
        db.disconnect()
    }
}