const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { Clear } = require('../../structures/Colors')
const { Punishment } = require('../../structures/Punishment')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Sim')
                .setEmoji('✔️')
                .setCustomId('YES'),
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('Não')
                .setEmoji('❌')
                .setCustomId('NO')
        ]

    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'Coloca o usuário especificado de castigo.',
            permissions: ['MODERATE_MEMBERS'],
            guildOnly: true,
            requireDatabase: true,
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer banir.',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'motivo',
                    description: 'Motivo pelo qual você está botando de castigo o membro.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'duracao',
                    description: 'Duração do castigo. (Em minutos)',
                    type: 'NUMBER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        let embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor(Clear.Red)
            .setDescription('Eu só trabalho com menções!')

        let target = interaction.options.getMember('membro')

        if (!target) return interaction.reply({ embeds: [embed], ephemeral: true })

        let reason = interaction.options.getString('motivo')

        let duration = interaction.options.getNumber('duracao')

        embed.setDescription('Você não pode se mutar!')

        if (target.id === interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })

        embed.setDescription('Eu não consigo botar esse membro de castigo! Talvez seu cargo esteja acima do meu!')

        if (!target.moderatable) return interaction.reply({ embeds: [embed], ephemeral: true })


        embed.setTitle('Antes de botar de castigo...').setColor(Clear.Green).setDescription(`Você tem certeza de que deseja botar de castigo ${target} pelo motivo:\n\`${reason}\`?`)

        const reply = await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: true, fetchReply: true })
        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', async (i) => {
            collector.stop()

            switch (i.customId) {
                case 'YES':
                    let member = interaction.guild.members.resolve(target)
                    await member
                        .timeout(duration * 60 * 1000, reason)
                        .then(() => {
                            embed.setTitle('Concluído!').setColor(Clear.Green).setDescription(`${target} mutado com sucesso!`)
                            i.update({ embeds: [embed], components: [], ephemeral: true })
                            Punishment(interaction, {target: target, type: 'Mute', reason: reason})
                            collector.stop()
                        })
                        .catch(err => {
                            embed.setTitle('Error!').setColor(Clear.Red).setDescription(`Um erro aconteceu, tente novamente ou contacte o programador!`)
                            i.update({ embeds: [embed], components: [], ephemeral: true })
                            console.log(err)
                            collector.stop()
                        })
                    break

                case 'NO':
                    embed.setTitle('Ok!').setColor(Clear.Green).setDescription('Operação cancelada!')
                    i.update({ embeds: [embed], components: [], ephemeral: true })
                    collector.stop()
                    break
            }
        })
    }
}