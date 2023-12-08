const fs = require('fs')

const filename = 'sample.txt'
const data = fs.readFileSync(filename, 'utf8')

const dataset = data.split(/\n/)

const grid = initializeGrid(dataset)
console.log(grid)

const [y, x] = findStart(grid)
console.log(`Starting X coord: ${x}, starting Y coord: ${y}`)

function findPipe(grid, y, x) {
  // check top
  if (grid[y + 1][x] == '|') {
  }
}

function findStart(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 'S') {
        return [i, j]
      }
    }
  }
}

function determineStartPipe(grid, y, x) {
  const up = grid[y + 1][x]
  const left = grid[y][x - 1]
  const right = grid[y][x + 1]
  const down = grid[y - 1][x]

  if (
    (up == '|' || up == 'F' || up == '7') &&
    (left == '-' || left == 'J' || left == '7')
  ) {
    return 'L'
  } else if (
    (up == '|' || up == 'F' || up == '7') &&
    (left == '-' || left == 'J' || left == '7')
  ) {
    return ''
  }
}

function initializeGrid(data) {
  const grid = []
  for (let i = 0; i < dataset.length; i++) {
    grid.push(dataset[i].split(''))
  }
  return grid
}
