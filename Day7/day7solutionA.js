const fs = require('fs')

const filename = 'sample.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

console.log(`Lines: ${lines}`)
