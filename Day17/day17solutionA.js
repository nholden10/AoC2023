const fs = require('fs')

const FILENAME = 'day16input.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const grid = initializeGrid(data)

function initializeGrid(data) {
  const lines = data.split('\n')
  const grid = []
  for (let line = 0; line < lines.length; line++) {
    grid.push(lines[line].split(''))
  }
  return grid
}
