const eventStructure = require(`../../infra/structures/EventStructure`)
const { MessageEmbed, Permissions } = require('discord.js')
const { ClearColors } = require('../../infra/utils/Colors')
const { getArray } = require('../../infra/utils/PermissionsDictionary')
const { ownersIDs, botPermissions } = require('../../../assets/config.json')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (!interaction.isCommand()) return

        // Check bot permissions in guild
        const currentPermissionsInGuild = new Permissions(interaction.guild.me.permissions)
        if (!botPermissions.every(perm => currentPermissionsInGuild.toArray().includes(perm))) {
            let embed = new MessageEmbed()
                .setTitle('Error!')
                .setColor(ClearColors.Red)
                .setDescription(`Eu não possuo algumas das seguintes permissões: \n**${getArray(permissions).join(',\n')}**.`)
                .setFooter({ text: 'Por favor, verifique e tente novamente.' })
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
        const command = this.client.commandsList.find(cmd => cmd.name === interaction.commandName)
        
        switch (true) {
            case (command.ownerOnly):
                if (!ownersIDs.includes(interaction.user.id)) {
                    let embed = new MessageEmbed()
                        .setTitle('Error!')
                        .setColor(ClearColors.Red)
                        .setDescription('Apenas os donos podem executar esse comando!')

                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }

            case (command.permissions):
                const permissionsBit = new Permissions(interaction.member.permissions)
                let embed = new MessageEmbed()
                    .setTitle('Error!')
                    .setColor(ClearColors.Red)
                    .setDescription('Você não tem permissão para executar esse comando!')
                    .setFooter({ text: `Permissões: ${getArray(command.permissions).join(', ')}` })
                    
                // Preciso pensar em uma forma de fazer o código rodar mesmo não tendo a key "permissions" em um comando.
                //if(command.permissions.length <= 0 || command.permissions.includes('')) return interaction.reply({ content: "Verifique se o campo **permissions** está vazio!", ephemeral: true})

                if (!command.permissions.every(perm => permissionsBit.toArray().includes(perm)) && !command.permissions.includes('')) {
                    console.log(`User ${interaction.user.tag} tried to execute the command: ${command.name}\n`)

                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }

            default:
                try {
                    command.run(interaction)
                }
                catch (err) {
                    console.log(err)
                }
        }
    }
}