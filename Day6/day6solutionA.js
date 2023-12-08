const fs = require('fs')

const filename = 'day6input.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

const times = extractValues(lines[0])
const distances = extractValues(lines[1])
const numberOfGames = times.length

let totalProduct

console.log(`Times: ${times}`)
console.log(`Distances: ${distances}`)

for (let i = 0; i < numberOfGames; i++) {
  let gameScore = getGameScore(times[i], distances[i])

  if (i == 0) {
    totalProduct = gameScore
  } else {
    totalProduct = totalProduct * gameScore
  }
}
console.log(`Product of all game scores: ${totalProduct}`)

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
  const valuesInterm = line.split(':')
  valuesInterm.splice(0, 1)
  let values = valuesInterm[0]
    .trim()
    .split(' ')
    .filter((item) => !isNaN(parseInt(item)))

  return values
}
