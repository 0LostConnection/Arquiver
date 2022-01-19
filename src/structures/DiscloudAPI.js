const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = class DiscloudAPI {
  constructor(token, botId) {
    this.token = token
    this.botId = botId
  }

  getBotInfo(token = this.token, botId = this.botId) {
    var promise = new Promise(async function (resolve, reject) {
      let callback = fetch(`https://discloud.app/status/bot/${botId}`, {
        headers: {
          "api-token": token
        }
      }).then(body => body.json())
      resolve(callback)
    })
    return promise
  }

  getUserInfo(token = this.token) {
    var promise = new Promise(async function (resolve, reject) {
      let callback = fetch(`https://discloud.app/status/user`, {
        headers: {
          "api-token": token
        }
      }).then(body => body.json())
      resolve(callback)
    })
    return promise
  }
}