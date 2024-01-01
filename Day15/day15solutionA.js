const fs = require('fs')

const FILENAME = 'day15input.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const initSequence = data.split(',')

let sum = 0

for (let seq = 0; seq < initSequence.length; seq++) {
  sum = sum + hash(initSequence[seq])
}
console.log(sum)

function hash(str) {
  let currentValue = 0
  for (let index = 0; index < str.length; index++) {
    currentValue = currentValue + str.charCodeAt(index)
    currentValue = (currentValue * 17) % 256
  }
  return currentValue
}
