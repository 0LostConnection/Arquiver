const Command = require(`${process.cwd()}/src/infra/structures/Command`)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'dbm-role',
            description: 'dbm-role',        
            permissions: ['MANAGE_GUILD'],
            options: [
                {
                    name: 'add',
                    description: 'add',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'cargo',
                            description: 'Cargo a ser adicionado',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'membro',
                            description: 'Membro o qual o cargo foi atribuído.',
                            type: 'USER',
                            required: true
                        },
                        {
                            name: 'tipo',
                            description: 'Como o membro recebeu o cargo?',
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
                            name: 'cargo',
                            description: 'Cargo a ser removido.',
                            type: 'ROLE',
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