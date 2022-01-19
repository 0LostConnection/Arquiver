const Command = require('../../structures/Command')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
let embed = new MessageEmbed()

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'database',
            description: 'Database dos vips/cargos',
            permissions: ['MANAGE_GUILD'],
            requireDatabase: true,
            guildOnly: true,
            options: [
                {
                    name: 'add',
                    description: 'add',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'cargo',
                            description: 'Adiciona ao banco de dados o membro e o cargo personalizado que o mesmo possui.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'membro',
                                    description: 'Membro que possui o cargo personalizado.',
                                    type: 'USER',
                                    required: true
                                },
                                {
                                    name: 'cargo',
                                    description: 'Cargo personalizado do membro.',
                                    type: 'ROLE',
                                    required: true
                                },
                                {
                                    name: 'tipo',
                                    description: 'De que maneira o membro obteve o cargo.',
                                    type: 'STRING',
                                    required: true,
                                    choices: [
                                        {
                                            name: 'sorteio',
                                            value: 'sorteio'
                                        },
                                        {
                                            name: 'compra',
                                            value: 'compra'
                                        },
                                        {
                                            name: 'evento',
                                            value: 'evento'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'vip',
                            description: 'Adiciona ao banco de dados o membro que obteve o vip.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'membro',
                                    description: 'Membro que recebeu o vip.',
                                    type: 'USER',
                                    required: true
                                },
                                {
                                    name: 'data_inicio',
                                    description: 'Data de início do vip.',
                                    type: 'STRING',
                                    required: true
                                },
                                {
                                    name: 'data_fim',
                                    description: 'Data do fim do vip. Coloque "-" em branco se o vip for permanente.',
                                    type: 'STRING',
                                    required: true
                                },
                                {
                                    name: 'tipo',
                                    description: 'De que maneira o membro obteve o vip.',
                                    type: 'STRING',
                                    required: true,
                                    choices: [
                                        {
                                            name: 'sorteio',
                                            value: 'sorteio'
                                        },
                                        {
                                            name: 'compra',
                                            value: 'compra'
                                        },
                                        {
                                            name: 'evento',
                                            value: 'evento'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'remove',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'cargo',
                            description: 'Cargo personalizado que será removido do banco de dados.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'cargo',
                                    description: 'cargo',
                                    type: 'ROLE',
                                    required: true
                                }
                            ]
                        },
                        {
                            name: 'vip',
                            description: 'Vip que será removido do banco de dados.',
                            type: 'SUB_COMMAND',
                            options: [
                                {
                                    name: 'membro',
                                    description: 'membro',
                                    type: 'USER',
                                    required: true
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'display',
                    description: 'Exibe a lista escolhida.',
                    type: 'SUB_COMMAND_GROUP',
                    options: [
                        {
                            name: 'cargo',
                            description: 'Lista dos cargos personalizados registrados.',
                            type: 'SUB_COMMAND',
                        },
                        {
                            name: 'vip',
                            description: 'Lista dos vips registrados.',
                            type: 'SUB_COMMAND',
                        },
                    ]
                },

            ],
        })
    }

    run = async (interaction) => {


        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/db/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}