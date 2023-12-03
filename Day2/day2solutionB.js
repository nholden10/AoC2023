const readline = require('readline')
const fs = require('fs')

let sumOfPowers = 0

const readInterface = readline.createInterface({
  input: fs.createReadStream('day2input.txt'),
  console: false,
})

readInterface.on('line', function (line) {
  console.log(line)
  let gameId = parseInt(getId(line))
  console.log('Game ID: ', gameId)
  const round = line.split(/[:;]/)
  round.splice(0, 1)

  const allSetsPerRound = assembleSets(round)
  let roundPower = getPower(allSetsPerRound)
  console.log(`Round power: ${roundPower}`)
  sumOfPowers = sumOfPowers + roundPower
  console.log(
    `Sum of powers: ${sumOfPowers}\n-----------------------------------------------------------------\n`
  )

  function assembleSets(round) {
    const sets = []
    for (let i = 0; i < round.length; i++) {
      let set = round[i].split(',')
      for (let j = 0; j < set.length; j++) {
        sets.push(set[j].trim())
      }
    }
    console.log(sets)
    return sets
  }

  function getId(line) {
    return line.split(' ')[1].split(':')[0]
  }

  function getPower(allSets) {
    let minRed = 0
    let minGreen = 0
    let minBlue = 0
    for (let i = 0; i < allSets.length; i++) {
      let colour = allSets[i].split(' ')[1]
      let number = parseInt(allSets[i].split(' ')[0])
      if (colour == 'red') {
        if (number > minRed) {
          minRed = number
        }
      } else if (colour == 'blue') {
        if (number > minBlue) {
          minBlue = number
        }
      } else if (colour == 'green') {
        if (number > minGreen) {
          minGreen = number
        }
      }
    }
    console.log(
      `Minimum reds needed: ${minRed}\nMinimum greens needed: ${minGreen}\nMinimum blues needed: ${minBlue}\n`
    )
    return minRed * minBlue * minGreen
  }
})
