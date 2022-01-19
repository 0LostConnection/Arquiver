const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const bite = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/bite').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const bread = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/bread').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const chocolate = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/chocolate').then(body => body.json());

        resolve(url);
    });
    return promise;
}

const cuddle = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/cuddle').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const dance = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/dance').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const kill = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/kill').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const laugh = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/laugh').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const lick = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/lick').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const lonely = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/lonely').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const pat = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/pat').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const poke = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/poke').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const pregnant = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/pregnant').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const punch = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/punch').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const run = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/run').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const sleep = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/sleep').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const spank = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/spank').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const spit = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/spit').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const steal = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/steal').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const tickle = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/tickle').then(body => body.json());

        resolve(url);
    });
    return promise;
}


const bored = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/bored').then(body => body.json());

        resolve(url);
    });
    return promise;
}

const angry = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/angry').then(body => body.json());

        resolve(url);
    });
    return promise;
}

const happy = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/happy').then(body => body.json());

        resolve(url);
    });
    return promise;
}

const kiss = () => {
    var promise = new Promise(async function(resolve, reject) {
        let { url } = await fetch('https://api.satou-chan.xyz/api/endpoint/kiss').then(body => body.json());

        resolve(url);
    });
    return promise;
}



exports.bite = bite;
exports.bread = bread;
exports.chocolate = chocolate;
exports.cuddle = cuddle;
exports.dance = dance;
exports.kill = kill;
exports.laugh = laugh;
exports.lick = lick;
exports.lonely = lonely;
exports.pat = pat;
exports.poke = poke;
exports.pregnant = pregnant;
exports.punch = punch;
exports.run = run;
exports.sleep = sleep;
exports.spank = spank;
exports.spit = spit;
exports.steal = steal;
exports.tickle = tickle;
exports.bored = bored;
exports.angry = angry;
exports.happy = happy;
exports.kiss = kiss;