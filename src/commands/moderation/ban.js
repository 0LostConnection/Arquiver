const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { Clear} = require('../../structures/Colors')
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
            name: 'ban',
            description: 'Bane o membro especificado.',
            permissions: ['BAN_MEMBERS'],
            guildOnly: true,
            options: [
                {
                    name: 'membro',
                    description: 'Pessoa que você quer banir.',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'motivo',
                    description: 'Motivo pelo qual você está banindo o membro.',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        //Cria o ojbeto da mensagem embed.
        let embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor(Clear.Red)
            .setDescription('Eu só trabalho com menções!')
        //Salvando o objeto Member e o Motivo em uma variável    
        let target = interaction.options.getMember('membro')

        if (!target) return interaction.reply({ embeds: [embed], ephemeral: true })

        let reason = interaction.options.getString('motivo')
        //Verificando se o autor do comando e o membro especificado são a mesma pessoa.
        embed.setDescription('Você não pode se banir!')
        
        if (target.id === interaction.user.id) return interaction.reply({ embeds: [embed], ephemeral: true })
        //Alterando o objeto embed.
        embed.setDescription('Eu não consigo banir esse membro! Talvez seu cargo esteja acima do meu!')
        //Verifica se o membro especificado pode ser banido.
        if (!target.bannable) return interaction.reply({ embeds: [embed], ephemeral: true })

        //Alterando o objeto embed.
        embed.setTitle('Antes de banir...').setColor(Clear.Green).setDescription(`Você tem certeza de que deseja banir ${target} pelo motivo:\n\`${reason}\`?`)
        //Inicio do collector.
        const reply = await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: true, fetchReply: true })
        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

        collector.on('collect', (i) => {
            collector.stop()

            switch (i.customId) {
                case 'YES':
                    let member = interaction.guild.members.resolve(target)
                    member
                        .ban({days: 7, reason: reason})
                        .then(() => {
                            embed.setTitle('Concluído!').setColor(Clear.Green).setDescription(`${target} banido com sucesso!`)
                            i.update({ embeds: [embed], components: [], ephemeral: true })
                            Punishment(interaction, {target: target, type: 'Banimento', reason: reason})
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
                    //Alterando o objeto embed.
                    embed.setTitle('Ok!').setColor(Clear.Green).setDescription('Operação cancelada!')
                    i.update({ embeds: [embed], components: [], ephemeral: true })
                    collector.stop()
                    break
            }
        })
    }
}