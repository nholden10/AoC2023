const readline = require('readline')
const fs = require('fs')

let sumOfPossibleIds = 0

const readInterface = readline.createInterface({
  input: fs.createReadStream('day2input.txt'),
  console: false,
})
//max 12 red, 13 green, 14 blue
readInterface.on('line', function (line) {
  console.log(line)
  let gameId = parseInt(getId(line))
  console.log('Game ID: ', gameId)
  const round = line.split(/[:;]/)
  round.splice(0, 1)
  // console.log(round)
  if (isGameValid(round)) {
    sumOfPossibleIds = sumOfPossibleIds + gameId
  }

  console.log(`Sum of possible game Ids: ${sumOfPossibleIds}\n`)
  console.log(
    '--------------------------------------------------------------------'
  )

  function getId(line) {
    return line.split(' ')[1].split(':')[0]
  }

  function isGameValid(round) {
    for (let i = 0; i < round.length; i++) {
      const sets = round[i].split(',')
      console.log(`\nsets: ${sets}`)
      for (let i = 0; i < sets.length; i++) {
        const set = sets[i].split(',')

        for (let i = 0; i < set.length; i++) {
          let colour = set[i].split(' ')[2]
          let number = parseInt(set[i].split(' ')[1])
          if (
            (colour == 'red' && number > 12) ||
            (colour == 'blue' && number > 14) ||
            (colour == 'green' && number > 13)
          ) {
            console.log('Game is not valid')
            return false
          } else {
            console.log(`${number} ${colour} is valid`)
          }
        }
      }
    }
    console.log('Game is valid')
    return true
  }
})
