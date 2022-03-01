const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const CommandStructure = require('../../infra/structures/CommandStructure')
const { Clear } = require('../../infra/structures/Colors')
const GetGif = require('../../infra/structures/GetGif')

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

module.exports = class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'tapa',
            description: 'Dê um tapa na pessoa desejada.',
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer dar um tapa.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        let gif = await GetGif('slap')

        let embed = new MessageEmbed()
            .setTitle('O que?! :scream_cat:')
            .setColor(Clear.Yellow)
            .setDescription(`${interaction.user} deu um tapa em ${interaction.options.getUser('membro')}!`)
            .setImage(gif)
            .setTimestamp()
            .setFooter({ text: 'Clique em 🔁 para retribuir' })

        const reply = await interaction.reply({ content: `<@${interaction.options.getUser('membro').id}>`, embeds: [embed], components: [replyButton], fetchReply: true })

        const filter = (b) => b.user.id === interaction.options.getUser('membro').id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            i.update({ embeds: [embed.setFooter({ text: '' })], components: [] })

            let gif = await GetGif('slap')

            embed
                .setDescription(`${interaction.options.getUser('membro')} retribuiu o tapa de ${interaction.user}!`)
                .setImage(gif)
                .setTimestamp()

            i.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed] })
        })
    }

}
