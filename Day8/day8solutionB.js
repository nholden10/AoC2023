const fs = require('fs')

const filename = 'sample2.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

const directions = lines[0]

let moveCount = 0
let directionCount = 0
let currentLines = getStartingLines(lines)

while (!areAllLocationsZ(currentLines)) {
  if (directions[directionCount] == undefined) {
    directionCount = 0
  }
  // console.log(`Current move is a ${directions[directionCount]}`)

  for (let i = 0; i < currentLines.length; i++) {
    let path = currentLines[i]
    if (directions[directionCount] == 'L') {
      // console.log(
      //   `Moving path ${i + 1} from ${getLocation(
      //     path,
      //     'current'
      //   )} to ${getLocation(path, 'L')}`
      // )
      currentLines[i] = getNextLine(lines, path, 'L')
    } else if (directions[directionCount] == 'R') {
      // console.log(
      //   `Moving path ${i + 1} from ${getLocation(
      //     path,
      //     'current'
      //   )} to ${getLocation(path, 'R')}`
      // )
      currentLines[i] = getNextLine(lines, path, 'R')
    }
  }
  console.log(`Move count: ${moveCount}`)
  directionCount++
  moveCount++
}
console.log(`All paths are on Zs in ${moveCount} moves`)

function areAllLocationsZ(currentLines) {
  for (const path of currentLines) {
    if (getLocation(path, 'current')[2] == 'Z') {
      continue
    } else {
      return false
    }
  }
  return true
}

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

function getStartingLines(lines) {
  const startingLines = []
  for (let i = 0; i < lines.length; i++) {
    if (getLocation(lines[i], 'current')[2] == 'A') {
      startingLines.push(lines[i])
    }
  }
  console.log(`${startingLines.length} paths starting in xxA spots:`)
  for (let i = 0; i < startingLines.length; i++) {
    console.log(
      `Starting location: ${getLocation(startingLines[i], 'current')}`
    )
  }
  console.log('\n')
  return startingLines
}
