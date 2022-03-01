class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.development = options.development
        this.description = options.description
        this.options = options.options
        this.disable = options.disable
    }
}

module.exports = Command