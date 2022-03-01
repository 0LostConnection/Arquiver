module.exports = (interaction) => {
    let invite

    invite = interaction.guild.invites.cache.get(interaction.client.user.id)

    if (!invite) {
        const channelId = interaction.guild.rulesChannel || interaction.guild.channels.cache.filter(chx => chx.type === "GUILD_TEXT").find(x => x.position === 0)

        return interaction.guild.invites.create(channelId, { temporary: false, maxUses: 0, maxAge: 0, reason: 'Convite para o serverinfo.' })
    } else {
        return invite
    }
}
