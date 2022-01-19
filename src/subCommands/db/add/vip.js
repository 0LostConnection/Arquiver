const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let vips = interaction.guild.db.vips

    let userId = interaction.options.getUser('membro').id
    let date = [
        interaction.options.getString('data_inicio'),
        interaction.options.getString('data_fim')
    ]
    let type = interaction.options.getString('tipo')
    let username = interaction.options.getUser('membro').username

    embed = new MessageEmbed()
        .setTitle('Error!')
        .setColor('FF0000')
        .setDescription('Esse usuário já está registrado!')

    if (vips.filter(e => e.userId === userId).length > 0) return interaction.reply({ embeds: [embed], ephemeral: true })

    let obj = {
        'userId': userId,
        'startDate': date[0],
        'endDate': date[1],
        'type': type,
        'username': username
    }

    vips.push(obj)
    interaction.guild.db.save()

    embed = new MessageEmbed()
        .setTitle(`Vip adicionado com sucesso no banco de dados!`)
        .setColor('#77B255')
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}