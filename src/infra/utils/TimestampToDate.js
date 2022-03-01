module.exports = (timestamp) => {
    if (isNaN(timestamp)) return

    let date = new Date(timestamp)
    const temp = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " as " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds()

    return temp
}