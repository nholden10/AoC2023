const fs = require('fs')

const FILENAME = 'day13input.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

const grids = assembleGrids(data)

const gridData = []

let sum = 0

for (let grid in grids) {
  console.log(
    `\n\n------------------------------------------------------------\nChecking for vertical symmetry of grid ${grid}\n`
  )
  if (!isVerticalSymmetry(grids[grid])) {
    console.log(`No vertical symmetry found.\n`)
    isHorizontalSymmetry(grids[grid])
  }
}

for (let grid in grids) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      grid[row][col] = swapSymbol(grid[row][col])
      if (!isVerticalSymmetry(grids[grid])) {
        console.log(`No vertical symmetry found.\n`)
        isHorizontalSymmetry(grids[grid])
      }
      if (gridData[grid] == gridData[grid + grids.length]) {
        console.log('Here!!!!!!!!!!')
        grid[row][col] = swapSymbol(grid[row][col])
        continue
      }
    }
  }
}

function swapSymbol(value) {
  let newVal
  if (value == '.') {
    newVal = '#'
  } else {
    newVal = '.'
  }
  return newVal
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
  // Loop 1: Searching column 0 to find initial symmetry
  loop1: for (let row = 0; row < grid.length - 1; row++) {
    if (grid[row][0] == grid[row + 1][0]) {
      // values match, check for symmetry around those rows for the rest of col 0
      if (checkColumnSymmetry(grid, row, 0)) {
        // symmetry found in col 0, check the rest of the columns
        // Loop 2: searching the rest of the colums around the initial symmetry found at row and row+1
        loop2: for (let col = 1; col < grid[row].length; col++) {
          if (checkColumnSymmetry(grid, row, col)) {
            // symmetry found for column, check next column.
            continue loop2
          } else {
            continue loop1
          }
        }
        console.log(
          `Horizontal symmetry found between rows ${row} and ${
            row + 1
          }. Adding ${(row + 1) * 100}.`
        )
        sum = sum + (row + 1) * 100
        console.log(`Total sum is: ${sum}`)
        gridData.push({
          symType: 'h',
          rowcol: row,
        })
        return true
        //check all colums
      } else {
        //no column symmetry around
        continue loop1
      }
    }
  }
  console.log(`No symmetry found.`)
  return false
}

function checkColumnSymmetry(_grid, _rowIndex, _col) {
  for (let i = 0; i < _grid.length; i++) {
    let row1 = _rowIndex - i
    let row2 = _rowIndex + i + 1
    // console.log(`row1: ${row1}, row2: ${row2}, col: ${_col}`)
    if (row1 < 0 || row2 == _grid.length) {
      //   console.log(`Col symmetry found...\nChecking next of cols...\n\n`)
      return true
    }

    if (_grid[row1][_col] == _grid[row2][_col]) {
      //   console.log(`Symmetry found. Checking rest of column ${_col}...`)
      continue
    } else {
      //   console.log(`No symmetry in col.`)
      return false
    }
  }
}

function isVerticalSymmetry(grid) {
  //   console.log(grid)
  loop1: for (let col = 0; col < grid[0].length; col++) {
    console.log(`column: ${col}`)
    if (grid[0][col] == grid[0][col + 1]) {
      console.log('HERE')
      //   console.log(
      //     `Possible symmetry found between columns: ${col} and ${
      //       col + 1
      //     }.\nChecking rest of row 0.\n\n`
      //   )
      if (checkRowSymmetry(grid[0], col)) {
        loop2: for (let row = 1; row < grid.length; row++) {
          if (checkRowSymmetry(grid[row], col)) {
            continue
          } else {
            // console.log(`Lack of symmetry found in row ${row}`)
            continue loop1
          }
        }
        console.log(
          `Vertical symmetry found between columns ${col} and ${
            col + 1
          }. Adding ${col + 1}.`
        )
        sum = sum + col + 1
        console.log(`Total sum is: ${sum}`)
        gridData.push({
          symType: 'v',
          rowcol: col,
        })
        return true
        //
      }
    } else {
      continue
    }
  }
  console.log(`No symmetry found`)
  return false
}

function checkRowSymmetry(_rowData, _colIndex) {
  for (let i = 0; i < _rowData.length; i++) {
    let column1 = _colIndex - i
    let column2 = _colIndex + i + 1
    if (column1 == -1 || column2 == _rowData.length) {
      //   console.log(`Row symmetry found...\nChecking next row...`)
      return true
    }

    if (_rowData[column1] == _rowData[column2]) {
      //   console.log(`Symmetry found. Checking next columns...`)
      continue
    } else {
      //   console.log(`No symmetry in row.`)
      return false
    }
  }
}
