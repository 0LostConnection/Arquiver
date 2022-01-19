const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let customRoles = interaction.guild.db.customRoles

    embed = new MessageEmbed()
        .setTitle('Error!')
        .setColor('FF0000')
        .setDescription('Não existe nenhum cargo personalizado registrado!')

    if (customRoles.length === 0) return interaction.reply({ embeds: [embed], ephemeral: true })

    const getUser = (index) => {
        let user = client.users.cache.get(customRoles[index].userId)
        if (!user) {
            user = `\`⚠️ ${customRoles[index].username} - ${customRoles[index].userId}\``
            return user
        } else {
            return user
        }
    }

    const getRole = (index) => {
        let role = interaction.guild.roles.cache.find(r => r.id === customRoles[i].roleId)
        if (!role) {
            role = `\`⚠️ @${customRoles[index].roleName} - ${customRoles[index].roleId}\``
        }
        return role
    }

    let data = []

    for (var i = 0; i < customRoles.length; i++) {
        data.push(`**Usuário:** ${getUser(i)}\n**Cargo**: ${getRole(i)}\n**Tipo:** ${customRoles[i].type}\n\n`)
    }
    embed = new MessageEmbed()
        .setTitle(`Cargos:`)
        .setColor('#c0eeff')
        .setDescription(`\n\n${data.join().replace(/,/g, '')}`)
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}