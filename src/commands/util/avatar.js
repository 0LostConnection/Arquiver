const Command = require('../../infra/structures/Command')
const { MessageEmbed } = require('discord.js')
const { Clear } = require('../../infra/utils/Colors')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'Baixe ou visualize sua foto de perfil ou a de outro usuário.',
            options: [
                {
                    name: 'membro',
                    description: 'Membro que você deseja vizualizar ou baixar a foto de perfil.',
                    required: false,
                    type: 'USER'
                }
            ]
        })
    }

    run = (interaction) => {
        const target = interaction.options.getUser('membro') || interaction.user
        const avatarURL = target.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })

        const embed = new MessageEmbed()
            .setTitle(`:frame_photo:  __${target.username}__`)
            .setColor(Clear.Water)
            .setDescription(`**[Clique aqui](${avatarURL}) para baixar a imagem. :smile:**`)
            .setImage(avatarURL)
            
        interaction.reply({ embeds: [embed] })
    }
}