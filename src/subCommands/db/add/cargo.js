const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let customRoles = interaction.guild.db.customRoles

    let userId = interaction.options.getUser('membro').id
    let username = interaction.options.getUser('membro').username
    let roleId = interaction.options.getRole('cargo').id
    let roleName = interaction.options.getRole('cargo').name
    let type = interaction.options.getString('tipo')

    embed = new MessageEmbed()
        .setTitle('Error!')
        .setColor('FF0000')
        .setDescription('Esse cargo personalizado já está registrado!')

    if (customRoles.filter(e => e.roleId === roleId).length > 0) return interaction.reply({ embeds: [embed], ephemeral: true })

    let obj = {
        'userId': userId,
        'roleId': roleId,
        'type': type,
        'username': username,
        'roleName': roleName
    }

    customRoles.push(obj)
    interaction.guild.db.save()

    embed = new MessageEmbed()
        .setTitle(`Cargo personalizado adicionado com sucesso no banco de dados!`)
        .setColor('#77B255')
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}