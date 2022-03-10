const Command = require(`${process.cwd()}/src/infra/structures/Command`)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'dbm-display',
            description: 'dbm-display',
            permissions: ['MANAGE_GUILD'],
            options: [
                {
                    name: 'lista',
                    description: 'Lista',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'cargo',
                            value: 'cargo'
                        },
                        {
                            name: 'vip',
                            value: 'vip'
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
    }
}