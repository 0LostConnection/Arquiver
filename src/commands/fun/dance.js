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
            name: 'dançar',
            description: 'Dance com a pessoa desejada.',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa com que você quer dançar.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let gif = await GetGif('dance')

        let embed = new MessageEmbed()
            .setTitle('Vapo vapo! :heart_eyes_cat:')
            .setColor(Dark.Pink)
            .setDescription(`${interaction.user} dançou com ${interaction.options.getUser('membro')}!`)
            .setImage(gif)
            .setTimestamp()
            .setFooter({ text: 'Clique em 🔁 para retribuir' })

        const reply = await interaction.reply({ content: `<@${interaction.options.getUser('membro').id}>`, embeds: [embed], components: [replyButton], fetchReply: true })

        const filter = (b) => b.user.id === interaction.options.getUser('membro').id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            i.update({ embeds: [embed.setFooter({ text: '' })], components: [] })

            let gif = await GetGif('dance')

            embed
                .setDescription(`${interaction.options.getUser('membro')} está dançando novamente com ${interaction.user}!`)
                .setImage(gif)
                .setTimestamp()

            i.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed] })
        })
    }

}
