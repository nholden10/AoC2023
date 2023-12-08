const fs = require('fs')

const filename = 'day6input.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

const time = extractValues(lines[0])
const distance = extractValues(lines[1])
const numberOfGames = 1

let waysToWin

console.log(`Times: ${time}`)
console.log(`Distances: ${distance}`)

for (let i = 0; i < numberOfGames; i++) {
  waysToWin = getGameScore(time, distance)
}
console.log(`The game can be won: ${waysToWin} ways`)

function getGameScore(time, distance) {
  const gameTime = parseInt(time)
  const requiredDistance = parseInt(distance)
  let scoreCount = 0
  for (let i = 0; i < time; i++) {
    let pressTime = i
    let speed = pressTime
    let roundDistance = speed * (gameTime - pressTime)
    if (roundDistance > requiredDistance) {
      scoreCount++
    }
  }
  return scoreCount
}

function extractValues(line) {
  let fullValue = ''
  const valuesInterm = line.split(':')
  valuesInterm.splice(0, 1)
  let values = valuesInterm[0]
    .trim()
    .split(' ')
    .filter((item) => !isNaN(parseInt(item)))

  for (let i = 0; i < values.length; i++) {
    fullValue = fullValue + values[i]
  }

  return parseInt(fullValue)
}
