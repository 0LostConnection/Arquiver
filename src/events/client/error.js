const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client){
        super(client, {
            name: 'error'
        })
    }
    
    run = (e) => {
        console.log(e)
    }
}