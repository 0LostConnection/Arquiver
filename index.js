const discordClientHandler = require('./src/infra/structures/DiscordClientHandler')
const { botToken } = require('./assets/config.json')
const GetGif = require('./src/infra/utils/GetGif')

const botInstance = new discordClientHandler({
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

botInstance.login(botToken)