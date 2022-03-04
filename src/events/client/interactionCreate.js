const Event = require(`${process.cwd()}/src/infra/structures/Event`)
const { MessageEmbed, Permissions } = require('discord.js')
const { Clear } = require('../../infra/utils/Colors')
const { getArray } = require('../../infra/utils/PermissionsDictionary')
const { ownerIds, permissions } = require('../../../assets/config.json')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (!interaction.isCommand()) return

        const guildPerm = new Permissions(interaction.guild.me.permissions)
        if (!permissions.every(perm => guildPerm.toArray().includes(perm))) {
            let embed = new MessageEmbed()
                .setTitle('Error!')
                .setColor(Clear.Red)
                .setDescription(`Eu não possuo algumas das seguintes permissões: \n**${getArray(permissions).join(',\n')}**.`)
                .setFooter({ text: 'Por favor, verifique e tente novamente.' })
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const cmd = this.client.commands.find(c => c.name === interaction.commandName)

        if (cmd.ownerOnly) {

            if (!ownerIds.includes(interaction.user.id)) {
                let embed = new MessageEmbed()
                    .setTitle('Error!')
                    .setColor(Clear.Red)
                    .setDescription('Apenas os donos podem executar esse comando!')

                return interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }

        const bit = new Permissions(interaction.member.permissions)
        if (cmd.permissions) {
            let embed = new MessageEmbed()
                .setTitle('Error!')
                .setColor(Clear.Red)
                .setDescription('Você não tem permissão para executar esse comando!')
                .setFooter({ text: `Permissões: ${getArray(cmd.permissions).join(', ')}` })

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