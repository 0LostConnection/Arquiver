const { MessageEmbed } = require('discord.js')
let embed

module.exports = (client, interaction) => {
    let vips = interaction.guild.db.vips

    embed = new MessageEmbed()
        .setTitle('Error!')
        .setColor('FF0000')
        .setDescription('Não existe nenhum usuário registrado!')

    if (vips.length === 0) return interaction.reply({ embeds: [embed], ephemeral: true })

    const getUser = (index) => {
        let user = client.users.cache.get(vips[index].userId)
        if (!user) {
            user = `\`⚠️ ${vips[index].username} - ${vips[index].userId}\``
            return user
        } else {
            return user
        }
    }

    let data = []

    for (var i = 0; i < vips.length; i++) {
        data.push(`**Usuário:** ${getUser(i)}\n**Data de Inicio:** ${vips[i].startDate}\n**Data de Término:** ${vips[i].endDate}\n**Tipo:** ${vips[i].type}\n\n`)
    }

    embed
        .setTitle(`Vips:`)
        .setColor('#c0eeff')
        .setDescription(`\n\n${data.join().replace(/,/g, '')}`)
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: true })
}