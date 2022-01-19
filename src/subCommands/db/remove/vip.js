const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let userId = interaction.options.getUser('membro').id
    let vips = interaction.guild.db.vips
    if (!vips.filter(e => e.userId === userId).length > 0) {
        embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor('FF0000')
            .setDescription('Esse usuário não está registrado!')

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    for (var i = 0; i < vips.length; i++) {
        if (vips[i].userId === userId) {
            vips.splice(i, 1)
        }
    }
    interaction.guild.db.save()

    embed = new MessageEmbed()
        .setTitle(`Vip removido com sucesso do banco de dados!`)
        .setColor('#77B255')
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}