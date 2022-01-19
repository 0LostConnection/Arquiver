const Client = require('./src/structures/Client')
const { token } = require('./src/assets/config.json')

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_MEMBERS'
    ],
})

process.on('unhandledRejection', error => {
    console.log('Error:\n', error);
})

client.login(token)
//client.login(process.env.DEV_TOKEN)