const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let roleId = interaction.options.getRole('cargo').id
    let roles = interaction.guild.db.customRoles

    if (!roles.filter(e => e.roleId === roleId).length > 0) {
        embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor('FF0000')
            .setDescription('Esse cargo não está registrado!')

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    for (var i = 0; i < roles.length; i++) {
        if (roles[i].roleId === roleId) {
            roles.splice(i, 1)
        }
    }
    interaction.guild.db.save()

    embed = new MessageEmbed()
        .setTitle(`Cargo personalizado removido com sucesso do banco de dados!`)
        .setColor('#77B255')
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}
