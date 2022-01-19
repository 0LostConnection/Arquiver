const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../structures/Command')
const GetGif = require('../../structures/GetGif')
const { Dark } = require('../../structures/Colors')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Retribuir')
                .setEmoji('🔁')
                .setCustomId('RETRIBUIR')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            description: 'Faça cafuné na pessoa desejada.',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer fazer cafuné.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let gif = await Promise.resolve(GetGif.pat())

        let embed = new MessageEmbed()
            .setTitle('Que coisa fofa! :heart_eyes_cat:')
            .setColor(Dark.Pink)
            .setDescription(`${interaction.user} fez cafuné em ${interaction.options.getUser('membro')}`)
            .setImage(gif)
            .setTimestamp()
            .setFooter(`Clique em 🔁 para retribuir!`)

        const reply = await interaction.reply({ content: `<@${interaction.options.getUser('membro').id}>`, embeds: [embed], components: [actionRow], fetchReply: true })

        const filter = (b) => b.user.id === interaction.options.getUser('membro').id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            let gif = await Promise.resolve(GetGif.pat())

            i.update({ embeds: [embed.setFooter('')], components: [] })
            embed = new MessageEmbed()
                .setTitle('Que coisa fofa! :heart_eyes_cat:')
                .setColor(Dark.Pink)
                .setDescription(`${interaction.options.getUser('membro')} retribuiu o cafuné de ${interaction.user}!`)
                .setImage(gif)
                .setTimestamp()

            i.channel.send({ content: `<@${interaction.user.id}>` ,embeds: [embed] })
        })
    }
}