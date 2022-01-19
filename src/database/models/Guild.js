const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    channels: {
        punishment: String
    },
    vips: [
        Object
    ],
    customRoles: [
        Object
    ]
})

module.exports = model('guilds', guildSchema)