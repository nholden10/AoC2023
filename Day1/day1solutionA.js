const readline = require('readline')
const fs = require('fs')

let sumOfCoords = 0

const readInterface = readline.createInterface({
  input: fs.createReadStream('day1input.txt'),
  console: false,
})

readInterface.on('line', function (line) {
  let coord = ''
  console.log('Current line: ', line)
  coord = getFirstDigit(line).concat(getSecondDigit(line))
  console.log('Line Coord: ', coord)
  sumOfCoords = sumOfCoords + parseInt(coord)
  console.log('Sum of Coords: ', sumOfCoords, '\n')

  function getFirstDigit(line) {
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(line[i])) {
        return line[i]
      }
    }
  }

  function getSecondDigit(line) {
    for (let i = line.length - 1; i >= 0; i--) {
      if (!isNaN(line[i])) {
        return line[i]
      }
    }
  }
})
