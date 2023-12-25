const fs = require('fs')

const FILENAME = 'sample.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const grids = assembleGrids(data)

for (let grid in grids) {
  console.log(isVerticalSymmetry(grids[grid]))
}

function assembleGrids(data) {
  const dataByRow = data.split('\n')
  const grids = {}
  let grid = []
  let gridCount = 0
  for (let row = 0; row <= dataByRow.length; row++) {
    if (dataByRow[row] == '' || row == dataByRow.length) {
      grids[gridCount] = grid
      grid = []
      gridCount++
      //console.log(gridCount)
    } else {
      grid.push(dataByRow[row].split(''))
    }
  }

  //   console.log(grids)
  return grids
}

function isHorizontalSymmetry(grid) {
  for (let row = 0; row < grid.length - 1; row++) {
    if (grid[row][0] == grid[row + 1][0]) {
      console.log(
        `Possible horizontal symmetry found between rows ${row} and ${row + 1}.\nChecking rest of column 0...`
      )
        if (checkColumnSymmetry(grid, col))
        for (let col = 1; col < grid[row].length; col++){
            if (checkCol)
        }
        
    } else {
      continue
    }
  }
}

function checkColumnSymmetry(grid, _colIndex) {
    for (let i = 0; i < _rowData.length; i++) {
        let column1 = _colIndex - i
        let column2 = _colIndex + i + 1
        if (_rowData[column1] == undefined || _rowData[column2] == undefined) {
          console.log(`Row symmetry found...\nChecking next row...`)
          return true
        }
    
        if (_rowData[column1] == _rowData[column2]) {
          console.log(`Symmetry found. Checking next columns...`)
          continue
        } else {
          console.log(`No symmetry in row.`)
          return false
        }
      }
}

function isVerticalSymmetry(grid) {
  //   console.log(grid)
  for (let col = 0; col < grid[0].length - 1; col++) {
    if (grid[0][col] == grid[0][col + 1]) {
      console.log(
        `Possible symmetry found between columns: ${col} and ${
          col + 1
        }.\nChecking rest of row 0.`
      )
      if (checkRowSymmetry(grid[0], col)) {
        for (let row = 1; row < grid.length; row++) {
          if (checkRowSymmetry(grid[row], col)) {
            continue
          } else {
            console.log(`Lack of symmetry found in row ${row}`)
            return false
          }
        }
        console.log(`Symmetry found between columns ${col} and ${col + 1}`)
        return true
        //
      }
    } else {
      console.log(`No vertical symmetry found.`)
      continue
    }
  }
  console.log(`No symmetry found`)
  return false
}

// for each puzzle, check for vertical symmetry starting
// with row 0, col x1, and col x2(starting with x1=0, x2=x1+1).

// If symmetry found compare, x1-1 and x2+1. Continue until edge
// of map.

// If edge of map hit. Symmetry of row 0 is confirmed. Next move
// to next row down and repeat process starting at the column
// that symmetry was found at for row 0

// If ever no symmetry, is found, exit funciton and move to
// check Horizontal symmetry.

function checkRowSymmetry(_rowData, _colIndex) {
  for (let i = 0; i < _rowData.length; i++) {
    let column1 = _colIndex - i
    let column2 = _colIndex + i + 1
    if (_rowData[column1] == undefined || _rowData[column2] == undefined) {
      console.log(`Row symmetry found...\nChecking next row...`)
      return true
    }

    if (_rowData[column1] == _rowData[column2]) {
      console.log(`Symmetry found. Checking next columns...`)
      continue
    } else {
      console.log(`No symmetry in row.`)
      return false
    }
  }
}
