const readline = require('readline')
const fs = require('fs')

const FILENAME = 'sample.txt'

class Location {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let grid = [['#'], ['.']]
let loc = new Location(0, 0)
let volume = 1

const readInterface = readline.createInterface({
  input: fs.createReadStream(FILENAME),
  console: false,
})

readInterface.on('line', function (line) {
  const [dir, distance, colour] = line.split(' ')
  for (let d = 0; d < distance; d++) {
    if (dir == 'U') {
      if (loc.y - 1 < 0) {
        addRowUp()
      }
      loc.y--
    } else if (dir == 'R') {
      if (loc.x + 1 == grid[0].length) {
        addColRight()
      }
      loc.x++
    } else if (dir == 'D') {
      if (loc.y + 1 == grid.length) {
        addRowDown()
      }
      loc.y++
    } else if (dir == 'L') {
      if (loc.x - 1 < 0) {
        addColLeft()
      }
      loc.x--
    }
    if (grid[loc.y][loc.x] == '.') {
      grid[loc.y][loc.x] = '#'
      volume++
    }
    console.log(volume)
    printGrid(grid)
  }
})

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].toString().replaceAll(',', ''))
  }
  console.log('\n\n')
}

function addRowUp() {
  const cols = grid[0].length
  const newRow = []
  for (let i = 0; i < cols; i++) {
    newRow.push('.')
  }
  grid.unshift(newRow)
  loc.y++
}

function addRowDown() {
  const cols = grid[0].length
  const newRow = []
  for (let i = 0; i < cols; i++) {
    newRow.push('.')
  }
  grid.push(newRow)
}
function addColLeft() {
  const rows = grid.length
  for (let i = 0; i < rows; i++) {
    grid[i].unshift('.')
  }
  loc.x++
}

function addColRight() {
  const rows = grid.length
  for (let i = 0; i < rows; i++) {
    grid[i].push('.')
  }
}
