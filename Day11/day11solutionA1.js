const fs = require('fs')

const filename = 'day11input.txt'
const data = fs.readFileSync(filename, 'utf8')

const universe = initializeGrid(data)
const expandedUniverse = expandUniverse(universe)

const [numberedUniverse, galaxyCount] = numberGalaxies(expandedUniverse)
let pathLength
let sumOfPathLengths = 0
for (let i = 1; i < galaxyCount; i++) {
  for (let j = i + 1; j < galaxyCount; j++) {
    pathLength = findShortestPath(i, j, numberedUniverse)
    //console.log(`Shortest distance from galaxy ${i} and ${j} is ${pathLength}`)
    sumOfPathLengths = sumOfPathLengths + pathLength
  }
}
console.log(`Sum of total path lengths is ${sumOfPathLengths}`)

function findShortestPath(galaxyOne, galaxyTwo, universe) {
  let galaxyOneX, galaxyTwoX, galaxyOneY, galaxyTwoY
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[0].length; j++) {
      if (universe[i][j] == galaxyOne) {
        galaxyOneX = j
        galaxyOneY = i
      } else if (universe[i][j] == galaxyTwo) {
        galaxyTwoX = j
        galaxyTwoY = i
      }
    }
  }
  return Math.abs(galaxyTwoX - galaxyOneX) + Math.abs(galaxyTwoY - galaxyOneY)
}

function numberGalaxies(universe) {
  let galaxyCounter = 1

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[0].length; j++) {
      const currentSpace = universe[i][j]
      if (currentSpace == '#') {
        universe[i][j] = galaxyCounter
        galaxyCounter++
      }
    }
  }
  console.log(
    `\n-------------------------\n|| numbered universe ||\n-------------------------\n`
  )
  printGrid(universe)

  return [universe, galaxyCounter]
}

function expandUniverse(universe) {
  //check and expand y direction
  const expandedUniverse = []
  for (let i = 0; i < universe.length; i++) {
    const currentRow = universe[i]
    if (currentRow.includes('#')) {
      expandedUniverse.push(currentRow)
    } else {
      expandedUniverse.push(currentRow)
      expandedUniverse.push(currentRow)
    }
  }

  //check and expand x direction
  const moreExpandedUniverse = []
  const rowsToExpand = []
  for (let i = 0; i < expandedUniverse[0].length; i++) {
    if (expandedUniverse[0][i] == '.') {
      for (let j = 1; j < expandedUniverse.length; j++) {
        if (expandedUniverse[j][i] == '#') {
          break
        }
        if (j == expandedUniverse.length - 1) {
          rowsToExpand.push(i)
        }
      }
    }
  }

  // end found with no #'s
  // expand universe
  for (let k = 0; k < expandedUniverse.length; k++) {
    const newRow = []
    const rowLength = expandedUniverse[0].length
    for (let m = 0; m < rowLength; m++) {
      if (!rowsToExpand.includes(m)) {
        // console.log(`k: ${k}, m: ${m}`)
        newRow.push(expandedUniverse[k][m])
      } else {
        newRow.push(expandedUniverse[k][m])
        newRow.push('.')
      }
    }
    moreExpandedUniverse.push(newRow)
  }

  console.log(
    `\n-------------------------\n|| expanded universe ||\n-------------------------\n`
  )

  printGrid(moreExpandedUniverse)
  return moreExpandedUniverse
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
