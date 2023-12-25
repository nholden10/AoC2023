const fs = require('fs')

const FILENAME = 'sample.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const data2 = data.split('\n')
for (let i = 0; i < data2.length; i++) {}
console.log(data2)

// for each puzzle, check for vertical symmetry starting
// with row 0, col x1, and col x2(starting with x1=0, x2=x1+1).

// If symmetry found compare, x1-1 and x2+1. Continue until edge
// of map.

// If edge of map hit. Symmetry of row 0 is confirmed. Next move
// to next row down and repeat process starting at the column
// that symmetry was found at for row 0

// If ever no symmetry, is found, exit funciton and move to
// check Horizontal symmetry.

function checkSymmetryVertical(grid, _row, _col) {
  let searchColumn
  if (_row == 0) {
    searchColumn = 0
  } else {
    searchColumn = _col
  }

  for (let col = searchColumn; col < grid[_row].length; col++) {
    if (
      grid[_row][_col - col] != undefined &&
      grid[_row][_col + col + 1] != undefined
    ) {
      if (grid[_row][_col - col] == grid[_row][_col + col + 1]) {
        continue
      } else {
        break
      }
    } else {
      // symmetry found due to hitting the edge of the map
    }
  }
  return false
}

for (let nextRow = 1; nextRow < grid.length; nextRow++) {
  checkSymmetryVertical(grid, nextRow, col)
}
