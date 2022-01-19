const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

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
            name: 'unban',
            description: 'Remove o banimento o membro especificado.',
            permissions: ['BAN_MEMBERS'],
            guildOnly: true,
            options: [
                {
                    name: 'id_membro',
                    description: 'ID da pessoa que você quer remover o banimento.',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

run = async (interaction) => {
        //Criando o ojbeto da mensagem embed.
        let embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor(Clear.Red)
            .setDescription('Não existe nenhum banimento nesse servidor.')
        //Salvando o id do membro a ser desbanido em uma variável.
        let targetId = interaction.options.getString('id_membro')
        
        interaction.guild.bans.fetch().then(async banList => {
            //Checa se existe algum ban.
            if (banList.size === 0) return interaction.reply({ embeds: [embed], ephemeral: true})

            //Salvando o objeto do usuário banido em umva variável
            let bannedTarget = banList.find(b => b.user.id === targetId)
            //Alterando o objeto embed.
            embed.setDescription('Esse usuário não está banido!')

            //Checando se o usuário banido existe.
            if (!bannedTarget) return interaction.reply({ embeds: [embed], ephemeral: true })

            //Alterando o objeto embed.
            embed.setTitle('Antes de remover o ban...').setColor(Clear.Green).setDescription(`Você tem certeza de que deseja remover o banimento de ${bannedTarget.user}?`)

            //Inicio do collector.
            const reply = await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: true, fetchReply: true })
            const filter = (b) => b.user.id === interaction.user.id
            const collector = reply.createMessageComponentCollector({ filter, time: 120000 })

            collector.on('collect', (i) => {
                collector.stop()

                switch (i.customId) {
                    case 'YES':
                        //Desbanindo o membro.
                        interaction.guild.members.unban(bannedTarget.user)
                            .then(() => {
                                embed.setTitle('Concluído!').setColor(Clear.Green).setDescription(`O banimento de ${bannedTarget.user} foi removido com sucesso!`)
                                i.update({ embeds: [embed], components: [], ephemeral: true })
                            })
                            .catch(err => {
                                embed.setTitle('Error!').setColor(Clear.Red).setDescription(`Um erro aconteceu, tente novamente ou contacte o programador!`)
                                i.update({ embeds: [embed], components: [], ephemeral: true })
                                console.log(err)
                            })
                            break

                    case 'NO':
                        //Alterando o objeto embed.
                        embed.setTitle('Ok!').setColor(Clear.Green).setDescription('Operação cancelada!')
                        i.update({ embeds: [embed], components: [], ephemeral: true })
                        break
                }
            })

        })
    }
}