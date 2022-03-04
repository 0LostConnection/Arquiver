const Client = require('./src/infra/structures/Client')
const { token } = require('./assets/config.json')

const bot = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_MEMBERS'
    ]
})

process.openStdin('unhandledRejection', error => {
    console.error("Error:\n", error)
})

//bot.login(token)
bot.login(process.env.DEV_TOKEN)