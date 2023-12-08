const readline = require('readline')
const fs = require('fs')

let totalPoints = 0

const readInterface = readline.createInterface({
  input: fs.createReadStream('day4input.txt'),
  console: false,
})

readInterface.on('line', function (line) {
  let cardPoints = 0
  const [gameID, winners, numbers] = [
    line.split(/[:|]/)[0].trim(),
    line.split(/[:|]/)[1].trim(),
    line.split(/[:|]/)[2].trim(),
  ]

  const winningNumbers = winners.split(' ').filter((item) => item != '')
  const myNumbers = numbers.split(' ').filter((item) => item != '')

  console.log(`${gameID}:\n`)
  for (let i = 0; i < winningNumbers.length; i++) {
    let winner = winningNumbers[i]
    console.log(`Searching for ${winner}...`)
    for (let i = 0; i < myNumbers.length; i++) {
      if (myNumbers[i] == winner) {
        console.log(`Winning number of ${winner} found`)
        if (cardPoints == 0) {
          cardPoints = 1
        } else {
          cardPoints = cardPoints * 2
        }
      }
    }
  }
  totalPoints = totalPoints + cardPoints
  console.log(
    `Card wins ${cardPoints} points.\nTotal points so far: ${totalPoints}\n------------------------------------------------------------------------------\n`
  )
})
