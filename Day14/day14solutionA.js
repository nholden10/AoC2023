const fs = require('fs')

const FILENAME = 'day14input.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const grid = assembleGrid(data)

const TOTALROWS = grid.length

let totalMass = 0
printGrid(grid)

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    const value = grid[row][col]
    if (value == 'O') {
      moveRoundRock(grid, row, col)
    }
  }
}

printGrid(grid)

console.log(`Final mass is ${totalMass}`)

function assembleGrid(data) {
  const data2 = data.split('\n')
  const grid = []
  for (let i = 0; i < data2.length; i++) {
    const row = data2[i].split('')
    grid.push(row)
  }
  return grid
}

function moveRoundRock(grid, row, col) {
  let finalRow
  for (let i = 0; i < grid.length; i++) {
    if (row - (i + 1) < 0) {
      finalRow = 0
      console.log(`final row: ${finalRow}`)
      break
    }
    if (grid[row - (i + 1)][col] == '.') {
      ;[grid[row - i][col], grid[row - (i + 1)][col]] = [
        grid[row - (i + 1)][col],
        grid[row - i][col],
      ]
    } else {
      finalRow = row - i
      console.log(`final row: ${finalRow}`)
      break
    }
  }
  totalMass = totalMass + (TOTALROWS - finalRow)
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join().replaceAll(',', ''))
  }
  console.log('\n\n')
}
