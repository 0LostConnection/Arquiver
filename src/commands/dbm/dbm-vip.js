const Command = require(`${process.cwd()}/src/infra/structures/Command`)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'dbm-vip',
            description: 'dbm-vip',
            permissions: ['MANAGE_GUILD'],
            options: [
                {
                    name: 'add',
                    description: 'add',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'membro',
                            description: 'Membro que recebeu o vip.',
                            type: 'USER',
                            required: true
                        },
                        {
                            name: 'data-inicio',
                            description: 'Data de início do vip..',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'data-fim',
                            description: 'Data do fim do vip. Coloque "-" em branco se o vip for permanente.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'tipo',
                            description: 'Como o membro recebeu o vip?',
                            type: 'STRING',
                            required: true,
                            choices: [
                                {
                                    name: 'Sorteio',
                                    value: 'sorteio'
                                },
                                {
                                    name: 'Compra',
                                    value: 'compra'
                                },
                                {
                                    name: 'Evento',
                                    value: 'evento'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'remove',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'membro',
                            description: 'Vip que será removido',
                            type: 'USER',
                            required: true
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
    }
}