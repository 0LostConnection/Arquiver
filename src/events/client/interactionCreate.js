const { MessageEmbed, Permissions } = require('discord.js')
const Event = require('../../structures/Event')
const { ownerIds, permissions } = require('../../assets/config.json')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand()) {

            //Verifica se o bot possui as permissões necessárias
            const guildPermissions = new Permissions(interaction.guild.me.permissions)
            let embed = new MessageEmbed()
                .setTitle('Error!')
                .setColor('FF0000')
                .setDescription(`Eu não possuo algumas das seguintes permissões: \n**${permissions.join('**, **')}**`)

            if (permissions.every(perm => guildPermissions.toArray().includes(perm))) { } else {
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }
            //

            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            embed.setDescription('Meus comandos só podem ser utilizados em servidores!')

            if (!interaction.inGuild() && cmd.guildOnly) return interaction.reply({ embeds: [embed] })

            if (cmd.userCommand && cmd.requireDatabase) {
                interaction.user.db =
                    await this.client.db.users.findById(interaction.user.id) ||
                    new this.client.db.users({ _id: interaction.user.id })
            }

            if (cmd.requireDatabase && cmd.guildOnly) {
                interaction.guild.db =
                    await this.client.db.guilds.findById(interaction.guild.id) ||
                    new this.client.db.guilds({ _id: interaction.guild.id })
            }

            if (cmd.ownerOnly) {

                if (!ownerIds.includes(interaction.user.id)) {
                    embed = new MessageEmbed()
                        .setTitle('Error!')
                        .setColor('FF0000')
                        .setDescription('Apenas os donos podem executar esse comando!')

                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }

            const bit = new Permissions(interaction.member.permissions)
            if (cmd.permissions) {
                console.log(cmd.permissions)
                embed = new MessageEmbed()
                    .setTitle('Error!')
                    .setColor('FF0000')
                    .setDescription('Você não tem permissão para executar esse comando!')
                    .setFooter({ text: `Permissões: ${cmd.permissions.join(', ')}` })

                if (cmd.permissions.every(perm => bit.toArray().includes(perm))) { } else {
                    console.log(`User ${interaction.user.tag} tried to execute the command: ${cmd.name}\n`)

                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }

            try {
                if (cmd) cmd.run(interaction)
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}
