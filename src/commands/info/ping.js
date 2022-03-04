const Command = require(`${process.cwd()}/src/infra/structures/Command`)
const database = require(`${process.cwd()}/src/database/Database`)
const { dictionary: permDic, getArray} = require('../../infra/utils/PermissionsDictionary')

module.exports = class extends Command {
    constructor(client) {
        super (client, {
            name: 'ping',
            description: 'Pong!',
            disable: false,
            ownerOnly: false,
            permissions: ['BAN_MEMBERS']
        })
    }

    run = async (interaction) => {
        interaction.reply({ content: '🏓 Pong!'})
        
        /*let perm = ['MANAGE_GUILD', 'VIEW_CHANNEL']
        console.log(permDic[perm[0]])*/

        /*const db = await database(interaction.guildId)
        //db.guild.channels.punishment = 123456
        await db.guild.save()
        db.disconnect()*/

/*         const getBotInvite = require('../../infra/utils/Invites')
        const invite = await Promise.resolve(getBotInvite(interaction))
        console.log(`https://lost-redirect.vercel.app?copy=${invite}&alertText=Convite%20copiado%20para%20sua%20área%20de%20transferência!`) */
    }
}