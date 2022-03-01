const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const Command = require('../../infra/structures/Command')
const { Clear } = require('../../infra/utils/Colors')
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
            name: 'socar',
            description: 'Dê um soco na pessoa desejada.',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer dar um soco.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let gif = await GetGif('punch')

        let embed = new MessageEmbed()
            .setTitle('O que?! :scream_cat: ')
            .setColor(Clear.Yellow)
            .setDescription(`${interaction.user} deu um murro em ${interaction.options.getUser('membro')}!`)
            .setImage(gif)
            .setTimestamp()
            .setFooter({ text: 'Clique em 🔁 para retribuir' })

        const reply = await interaction.reply({ content: `<@${interaction.options.getUser('membro').id}>`, embeds: [embed], components: [replyButton], fetchReply: true })

        const filter = (b) => b.user.id === interaction.options.getUser('membro').id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            i.update({ embeds: [embed.setFooter({ text: '' })], components: [] })

            let gif = await GetGif('punch')

            embed
                .setDescription(`${interaction.options.getUser('membro')} retribuiu o soco de ${interaction.user}!`)
                .setImage(gif)
                .setTimestamp()

            i.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed] })
        })
    }

}
