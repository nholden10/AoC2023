const fs = require('fs')

const FILENAME = 'sample.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const grid = assembleGrid(data)

const TOTALROWS = grid.length
const TOTALCOLUMNS = grid[0].length
const TOTALCYCLES = 1

let totalMass = 0
printGrid(grid)
for (let cycles = 0; cycles < TOTALCYCLES; cycles++) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col]
      if (value == 'O') {
        moveGridNorth(grid, row, col)
      }
    }
  }
  printGrid(grid)
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col]
      if (value == 'O') {
        moveGridWest(grid, row, col)
      }
    }
  }
  printGrid(grid)
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col]
      if (value == 'O') {
        moveGridSouth(grid, row, col)
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col]
      if (value == 'O') {
        moveGridEast(grid, row, col)
      }
    }
  }
  printGrid(grid)
  console.log(`cycle count: ${cycles}`)
}

printGrid(grid)

// console.log(`Final mass is ${totalMass}`)

function assembleGrid(data) {
  const data2 = data.split('\n')
  const grid = []
  for (let i = 0; i < data2.length; i++) {
    const row = data2[i].split('')
    grid.push(row)
  }
  return grid
}

function moveGridWest(grid, row, col) {
  for (let i = 0; i < grid[row].length; i++) {
    if (col - (i + 1) < 0) {
      break
    }
    if (grid[row][col - (i + 1)] == '.') {
      ;[grid[row][col - i], grid[row][col - (i + 1)]] = [
        grid[row][col - (i + 1)],
        grid[row][col - i],
      ]
    } else {
      break
    }
  }
}

function moveGridEast(grid, row, col) {
  for (let i = 0; i < grid[row].length; i++) {
    if (col + (i + 1) > grid.length - 1) {
      break
    }
    if (grid[row][col + (i + 1)] == '.') {
      ;[grid[row][col + i], grid[row][col + (i + 1)]] = [
        grid[row][col + (i + 1)],
        grid[row][col + i],
      ]
    } else {
      break
    }
  }
}

function moveGridSouth(grid, row, col) {
  for (let i = 0; i < grid.length; i++) {
    if (row + (i + 1) > grid.length - 1) {
      break
    }
    if (grid[row + (i + 1)][col] == '.') {
      ;[grid[row + i][col], grid[row + (i + 1)][col]] = [
        grid[row + (i + 1)][col],
        grid[row + i][col],
      ]
    } else {
      break
    }
  }
}

function moveGridNorth(grid, row, col) {
  for (let i = 0; i < grid.length; i++) {
    if (row - (i + 1) < 0) {
      break
    }
    if (grid[row - (i + 1)][col] == '.') {
      ;[grid[row - i][col], grid[row - (i + 1)][col]] = [
        grid[row - (i + 1)][col],
        grid[row - i][col],
      ]
    } else {
      break
    }
  }
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join().replaceAll(',', ''))
  }
  console.log('\n\n')
}
