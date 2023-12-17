const fs = require('fs')

const filename = 'day10input.txt'
const data = fs.readFileSync(filename, 'utf8')

const dataset = data.split(/\n/)

const grid = initializeGrid(dataset)
//console.log(grid)

const [y, x] = findStart(grid)
const [startPipe, dir_x, dir_y] = determineStartPipe(grid, y, x)
console.log(
  `Starting X coord: ${x}, starting Y coord: ${y}\nStarting pipe is a ${startPipe}`
)

const totalMoves = countLoop(grid, y, x, startPipe, dir_y, dir_x)

console.log(
  `Total moves to get around loop: ${totalMoves}\nFurthest point is: ${
    totalMoves / 2
  } moves away`
)

function countLoop(grid, y, x, startPipe, dir_y, dir_x) {
  let location_x = x
  let direction_x = dir_x
  let location_y = y
  let direction_y = dir_y
  let currentPipe = startPipe
  let moveCount = 0

  // Start Looping
  if (moveCount == 0) {
    grid[location_y][location_x] = moveCount
    if (startPipe == '|' || startPipe == 'J' || startPipe == '7') {
      location_y++
    } else if (startPipe == '-' || startPipe == 'L' || startPipe == 'F') {
      location_x++
    }
    moveCount++
  }

  do {
    currentPipe = grid[location_y][location_x]
    console.log(currentPipe)
    if (currentPipe == '|') {
      grid[location_y][location_x] = moveCount
      if (dir_y == 1) {
        location_y--
      } else if (dir_y == -1) {
        location_y++
      }
    } else if (currentPipe == 'J') {
      grid[location_y][location_x] = moveCount
      if (dir_y == -1) {
        location_x--
        dir_y = 0
        dir_x = -1
      } else if (dir_x == 1) {
        location_y--
        dir_y = 1
        dir_x = 0
      }
    } else if (currentPipe == 'L') {
      grid[location_y][location_x] = moveCount
      if (dir_y == -1) {
        location_x++
        dir_y = 0
        dir_x = 1
      } else if (dir_x == -1) {
        location_y--
        dir_y = 1
        dir_x = 0
      }
    } else if (currentPipe == '-') {
      grid[location_y][location_x] = moveCount
      if (dir_x == -1) {
        location_x--
      } else if (dir_x == 1) {
        location_x++
      }
    } else if (currentPipe == 'F') {
      grid[location_y][location_x] = moveCount
      if (dir_y == 1) {
        location_x++
        dir_y = 0
        dir_x = 1
      } else if (dir_x == -1) {
        location_y++
        dir_y = -1
        dir_x = 0
      }
    } else if (currentPipe == '7') {
      grid[location_y][location_x] = moveCount
      if (dir_y == 1) {
        location_x--
        dir_y = 0
        dir_x = -1
      } else if (dir_x == 1) {
        location_y++
        dir_y = -1
        dir_x = 0
      }
    }
    console.log(`location x: ${location_x}, location y: ${location_y}`)
    console.log(`x: ${x}, y: ${y}`)

    //console.log(grid)

    moveCount++
  } while (location_x != x || location_y != y)
  return moveCount
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
  const down = grid[y + 1][x]
  const left = grid[y][x - 1]
  const right = grid[y][x + 1]
  const up = grid[y - 1][x]

  console.log(`Up: ${up}, left: ${left}, right: ${right}, down: ${down}`)

  if (
    (up == '|' || up == 'F' || up == '7') &&
    (right == '-' || right == 'J' || right == '7')
  ) {
    return ['L', 0, 1]
  } else if (
    (up == '|' || up == 'F' || up == '7') &&
    (left == '-' || left == 'L' || left == 'F')
  ) {
    return ['J', 0, 1]
  } else if (
    (up == '|' || up == 'F' || up == '7') &&
    (down == '|' || down == 'L' || down == 'J')
  ) {
    return ['|', 0, 1]
  } else if (
    (right == '-' || right == 'J' || right == '7') &&
    (down == '|' || down == 'L' || down == 'J')
  ) {
    return ['F', 1, 0]
  } else if (
    (left == '-' || left == 'F' || left == 'L') &&
    (down == '|' || down == 'L' || down == 'J')
  ) {
    return ['7', 0, -1]
  } else if (
    (left == '-' || left == 'F' || left == 'L') &&
    (right == '-' || right == 'J' || right == '7')
  ) {
    return ['-', 1, 0]
  } else {
    console.log('ERROR')
  }
}

function initializeGrid(data) {
  const grid = []
  for (let i = 0; i < dataset.length; i++) {
    grid.push(dataset[i].split(''))
  }
  return grid
}
