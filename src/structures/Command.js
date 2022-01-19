class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.guildOnly = options.guildOnly
        this.requireDatabase = options.requireDatabase
        this.userCommand = options.userCommand
        this.permissions = options.permissions
    }
}

module.exports = Command