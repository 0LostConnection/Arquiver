const database = require('../../../database/Database')
const { MessageEmbed } = require('discord.js')
const { ClearColors } = require('../../../infra/utils/Colors')

let embed = new MessageEmbed()
    .setTitle('Error!')
    .setColor(Clear.Red)
    .setDescription('Esse cargo personalizado já está registrado!')

module.exports = async (client, interaction) => {
    const db = await database(interaction.guildId)
    let customRoles = db.guild.customRoles
    let { id: userId, username } = interaction.options.getUser('membro')
    let { id: roleId, name: roleName } = interaction.options.getRole('cargo')
    let type = interaction.options.getString('tipo')

    console.log(`User -\nUsername: ${username}\nId: ${userId}\n\n\nName: ${roleName}\nId: ${roleId}\n\nTy ${type}`)

    if (customRoles.filter(e => e.roleId === roleId).length > 0) return interaction.reply({ embeds: [embed], ephemeral: true })
  
}