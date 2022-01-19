const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { Dark } = require('../../structures/Colors')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'Deseja baixar sua foto de perfil ou a de alguém?',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você deseja baixar a foto de perfil.',
                    type: 'USER',
                    required: false
                }
            ]
        })
    }
    run = (interaction) => {

        const user = interaction.options.getUser('membro') || interaction.member
        const imageURL = user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 })
        const username = user.username || user.user.username

        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setEmoji('🔗')
                    .setURL(imageURL)
            )

        const embed = new MessageEmbed()
            .setTitle(`🖼 ${username}`)
            .setColor(Dark.Purple)
            .setDescription(`**Clique [aqui](${imageURL}) para baixar a imagem!**`)
            .setImage(imageURL)
            .setTimestamp()
            .setFooter(`Ou clique no 🔗 para baixar a imagem!`)

        interaction.reply({ content: `<@${interaction.member.id}>`, embeds: [embed], components: [linkRow] })
    }
}