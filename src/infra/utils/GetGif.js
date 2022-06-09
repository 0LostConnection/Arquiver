const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const acceptableEndpoints = ["angry", "anime", "bite", "bored", "bread", "chocolate", "cookie", "cuddle", "dance", "drunk", "happy", "kill", "kiss", "laugh", "lick", "lonely", "pat", "poke", "pregnant", "punch", "run", "satouselfies", "slap", "sleep", "spank", "spit", "steal", "tickle" ]

module.exports = (endpoint) => {
    if (!acceptableEndpoints.includes(endpoint)) return 
    var promise = new Promise(async (resolve, reject) => {
        let { url } = await fetch(`https://api.satou-chan.xyz/api/endpoint/${endpoint}`).then(body => body.json());

        resolve(url)
    })

    return promise
}

/* 
/api/endpoint/{endpoint}
angry
anime
bite
bored
bread
chocolate
cookie
cuddle -> hug
dance
drunk
happy
kill
kiss
laugh
lick
lonely
pat
poke
pregnant
punch
run
satouselfies
slap
sleep
spank
spit
steal
tickle
*/