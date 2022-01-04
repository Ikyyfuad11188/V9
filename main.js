const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')

require('./index.js')
nocache('./index.js', module => console.log(`${module} Telah Di Update✓`))

const starts = async (nana = new WAConnection()) => {
    nana.logger.level = 'warn'
    nana.version = [2, 2143, 8]
    nana.browserDescription = ["Lexxy Official", "safari", "windows 10"];
    console.log(banner.string)
    nana.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session/QRnya.json') && nana.loadAuthInfo('./session/QRnya.json')
    nana.on('connecting', () => {
        start('2', 'Connecting...')
    })
    nana.on('open', () => {
        success('2', 'Connected')
    })
    await nana.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session/QRnya.json', JSON.stringify(nana.base64EncodedAuthInfo(), null, '\t'))

    nana.on('chat-update', async (message) => {
        require('./index.js')(nana, message)
    })
}


/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('[ ! ]', `'${module}'`, 'DI Pantau Oleh Lexxy Official')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })

}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
