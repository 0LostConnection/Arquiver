const { MessageEmbed } = require('discord.js')
const { Custom } = require('./Colors')

module.exports = {
    Punishment: function (interaction, punishment) {
        let punishmentChatId = interaction.guild.db.channels.punishment

        if (!punishmentChatId || punishmentChatId.length === 0) return

        const embed = new MessageEmbed()
            .setTitle(`\`${punishment.target.user.tag}\` recebeu uma punição.`)
            .setColor(Custom.LimeGreen)
            .setDescription(`**Tipo**: ${punishment.type}\n**Motivo**: ${punishment.reason}\n**Aplicada por**: ${interaction.member}`)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })

        const channel = interaction.guild.channels.cache.get(punishmentChatId)
        channel.send({ embeds: [embed] })
    }
}