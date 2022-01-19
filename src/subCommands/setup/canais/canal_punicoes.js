module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'Informe um canal de texto!', ephemeral: true })

    if (interaction.guild.db.channels.punishment) interaction.guild.db.channels.punishment = channel.id
    else interaction.guild.db.channels.punishment = channel.id

    interaction.guild.db.save()

    interaction.reply({ content: 'Canal setado com sucesso!', ephemeral: true })
}