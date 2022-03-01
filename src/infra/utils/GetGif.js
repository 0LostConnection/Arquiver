const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = (endpoint) => {
    var promise = new Promise(async (resolve, reject) => {
        let { url } = await fetch(`https://api.satou-chan.xyz/api/endpoint/${endpoint}`).then(body => body.json());

        resolve(url)
    })

    return promise
}