const fs = require('fs')

const filename = 'day8input.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

const directions = lines[0]

let moveCount = 0
let directionCount = 0
let currentLine = getAAAline(lines)

while (getLocation(currentLine, 'current') != 'ZZZ') {
  if (directions[directionCount] == undefined) {
    directionCount = 0
  }
  console.log(
    `\nMove count: ${moveCount}\nCurrently at line: ${getLocation(
      currentLine,
      'current'
    )} and turning ${directions[directionCount]}`
  )
  console.log(
    `Direction Count: ${directionCount}, Direction: ${directions[directionCount]}`
  )
  if (directions[directionCount] == 'L') {
    console.log(`Moving to ${getLocation(currentLine, 'L')}`)
    currentLine = getNextLine(lines, currentLine, 'L')
  } else if (directions[directionCount] == 'R') {
    console.log(`Moving to ${getLocation(currentLine, 'R')}`)
    currentLine = getNextLine(lines, currentLine, 'R')
  }
  directionCount++
  moveCount++
}
console.log(`Made if to line ZZZ in ${moveCount} moves`)

function getNextLine(lines, currentLine, nextMove) {
  for (let i = 0; i < lines.length; i++) {
    if (
      getLocation(lines[i], 'current') == getLocation(currentLine, nextMove)
    ) {
      return lines[i]
    }
  }
}

function getLocation(line, location) {
  if (location == 'current') {
    return line.substring(0, 3)
  } else if (location == 'L') {
    return line.substring(7, 10)
  } else if (location == 'R') {
    return line.substring(12, 15)
  }
}

function getAAAline(lines) {
  for (let i = 0; i < lines.length; i++) {
    if (getLocation(lines[i], 'current') == 'AAA') {
      return lines[i]
    }
  }
}
