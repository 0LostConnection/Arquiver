class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.disable = options.disable
        this.ownerOnly = options.ownerOnly
        this.permissions = options.permissions
    }
}

module.exports = Command