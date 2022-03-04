const database = require('../../../database/Database')

module.exports = async (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'Informe um canal de texto!', ephemeral: true })

    interaction.deferReply({ ephemeral: true })
    const db = await database(interaction.guildId)

    db.guild.channels.punishment = channel.id
    await db.guild.save().then(() => {
        interaction.editReply({ content: 'Canal setado com sucesso!', ephemeral: true })
        db.disconnect()
    })
    interaction.editReply({ content: 'Canal setado com sucesso!', ephemeral: true })
}
