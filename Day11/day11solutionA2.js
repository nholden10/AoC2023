const fs = require('fs')

const filename = 'day11input.txt'
const data = fs.readFileSync(filename, 'utf8')

const MULTIPLIER = 1000000

const universe = initializeGrid(data)

const [expandedRows, expandedColumns] = expandUniverse(universe)
console.log(`Expanded rows: ${expandedRows}, Expanded cols: ${expandedColumns}`)
const [numberedUniverse, galaxies] = numberGalaxies(
  universe,
  expandedRows,
  expandedColumns
)
console.log(galaxies)

let pathLength
let sumOfPathLengths = 0
for (let i = 1; i <= galaxies.length; i++) {
  for (let j = i + 1; j <= galaxies.length; j++) {
    pathLength = findShortestPath(i, j, expandedColumns, expandedRows, galaxies)
    sumOfPathLengths = sumOfPathLengths + pathLength
    console.log(`sumOfPathLengths: ${sumOfPathLengths}`)
  }
}
console.log(`Sum of total path lengths is ${sumOfPathLengths}`)

function findShortestPath(
  galaxyOne,
  galaxyTwo,
  expandedRows,
  expandedCols,
  galaxies
) {
  console.log(`
    galaxy one: ${galaxyOne},
    galaxy two: ${galaxyTwo},
    galaxyOneX = ${galaxies[galaxyOne - 1].galX}
    galaxyTwoX = ${galaxies[galaxyTwo - 1].galX}
    galaxyOneY = ${galaxies[galaxyOne - 1].galY}
    galaxyTwoY = ${galaxies[galaxyTwo - 1].galY}`)
  let galaxyOneX = galaxies[galaxyOne - 1].galX
  let galaxyTwoX = galaxies[galaxyTwo - 1].galX
  let galaxyOneY = galaxies[galaxyOne - 1].galY
  let galaxyTwoY = galaxies[galaxyTwo - 1].galY

  let rowMult = 0
  let colMult = 0

  // console.log(`expandedRows: ${expandedRows}`)
  // console.log(`expandedCols: ${expandedCols}`)

  for (let col of expandedCols) {
    // console.log(`col: ${col}`)
    if (galaxyOneX > galaxyTwoX) {
      if (col < galaxyOneX && col > galaxyTwoX) {
        colMult++
      }
    } else {
      if (col > galaxyOneX && col < galaxyTwoX) {
        colMult++
      }
    }
  }
  // console.log(`Crossing ${colMult} expanded cols`)
  for (let row of expandedRows) {
    // console.log(`row: ${row}`)
    if (galaxyOneY > galaxyTwoY) {
      if (row < galaxyOneY && row > galaxyTwoY) {
        rowMult++
      }
    } else {
      if (row > galaxyOneY && row < galaxyTwoY) {
        rowMult++
      }
    }
  }
  // console.log(`Crossing ${rowMult} expanded rows`)
  let shortestDistance =
    Math.abs(galaxyTwoX - galaxyOneX) +
    (MULTIPLIER * rowMult - rowMult) +
    Math.abs(galaxyTwoY - galaxyOneY) +
    (MULTIPLIER * colMult - colMult)
  // console.log(
  //   `Shortest distance between galaxy ${galaxyOne} and ${galaxyTwo} is ${shortestDistance}`
  // )

  return shortestDistance
}

function numberGalaxies(universe, expandedRows, expandedCols) {
  let galaxyCounter = 1
  const galaxies = []

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[0].length; j++) {
      const currentSpace = universe[i][j]
      if (currentSpace == '#') {
        // let colMult = 0
        // let rowMult = 0
        // for (let col of expandedCols) {
        //   console.log(`j: ${j}, i: ${i}, col: ${col}`)
        //   if (j > col) {
        //     console.log(
        //       `correcting x coord of galaxy ${galaxyCounter} because it crossed the expanded col ${col}`
        //     )
        //     colMult++
        //   }
        // }

        // for (let row of expandedRows) {
        //   if (i > row) {
        //     console.log(
        //       `correcting y coord of galaxy ${galaxyCounter} because it crossed the expanded row ${row}`
        //     )

        //     rowMult++
        //   }
        // }
        // console.log(
        //   `Correcting x coord for galaxy ${galaxyCounter} from ${j} to ${
        //     j + colMult * MULTIPLIER
        //   }, correcting y coord for galaxy ${galaxyCounter} from ${i} to ${
        //     i + rowMult * MULTIPLIER
        //   }`
        // )
        galaxies.push({
          galNum: galaxyCounter,
          galX: j,
          galY: i,
        })
        galaxyCounter++
      }
    }
  }
  return [universe, galaxies]
}

function expandUniverse(universe) {
  //check and expand y direction
  const expandedRows = []
  const expandedCols = []

  for (let i = 0; i < universe.length; i++) {
    const currentRow = universe[i]
    if (!currentRow.includes('#')) {
      expandedCols.push(i)
    }
  }

  //check and expand x direction
  for (let i = 0; i < universe[0].length; i++) {
    if (universe[0][i] == '.') {
      for (let j = 1; j < universe.length; j++) {
        if (universe[j][i] == '#') {
          break
        }
        if (j == universe.length - 1) {
          expandedRows.push(i)
        }
      }
    }
  }
  return [expandedRows, expandedCols]
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''))
  }
}

function initializeGrid(data) {
  const dataset = data.split(/\n/)
  const grid = []
  for (let i = 0; i < dataset.length; i++) {
    grid.push(dataset[i].split(''))
  }
  console.log(
    `\n----------------------\n||   Initial grid   ||\n----------------------\n`
  )
  printGrid(grid)
  console.log('\n')
  return grid
}
