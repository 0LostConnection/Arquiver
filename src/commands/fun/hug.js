const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { DarkColors } = require('../../infra/utils/Colors')
const GetGif = require('../../infra/utils/GetGif')

const replyButton = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setCustomId('REPLY')
                .setStyle('SUCCESS')
                .setLabel('Retribuir')
                .setEmoji('🔁')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'abraçar',
            description: 'Dê um abraço na pessoa desejada.',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer abraçar.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let gif = await GetGif('cuddle')

        let embed = new MessageEmbed()
            .setTitle('Que coisa fofa! :heart_eyes_cat:')
            .setColor(Dark.Pink)
            .setDescription(`${interaction.user} abraçou ${interaction.options.getUser('membro')}!`)
            .setImage(gif)
            .setTimestamp()
            .setFooter({ text: 'Clique em 🔁 para retribuir' })

        const reply = await interaction.reply({ content: `<@${interaction.options.getUser('membro').id}>`, embeds: [embed], components: [replyButton], fetchReply: true })

        const filter = (b) => b.user.id === interaction.options.getUser('membro').id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            i.update({ embeds: [embed.setFooter({ text: '' })], components: [] })

            let gif = await GetGif('cuddle')

            embed
                .setDescription(`${interaction.options.getUser('membro')} retribuiu o abraço de ${interaction.user}!`)
                .setImage(gif)
                .setTimestamp()

            i.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed] })
        })
    }

}
