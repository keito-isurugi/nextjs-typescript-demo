const crypto = require('crypto')

const base64 = json => {
    const jsonStr = JSON.stringify(json)
    const jsonB64 = Buffer.from(jsonStr).toString('base64')
    const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '')
    return jsonB64NoPadding
}

const HMAC_SHA256 = (key, data) => {
    const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
    const hashNoPadding = hash.replace(/={1,2}$/, '')
    return hashNoPadding
}

const header = { alg: 'HS256', typ: 'JWT' }
const payload = { sub: '1234567890', iat:1516239022 }
// const key = 'secret'
// const unsignedToken = `${base64(header)}.${base64(payload)}`
// const signature = HMAC_SHA256(key, unsignedToken)
// const jwt = `${unsignedToken}.${signature}`

// console.log(jwt)

const key = 'secret'
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.t42p4AHef69Tyyi88U6+p0utZYYrg7mmCGhoAd7Zffs'

const splits = jwt.split('.')
const unsignedToken = [splits[0], splits[1]].join('.')
const signature = splits[2]

console.log(HMAC_SHA256(key, unsignedToken) === signature)