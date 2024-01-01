const fs = require('fs')

const FILENAME = 'day16input.txt'
const data = fs.readFileSync(FILENAME, 'utf8')

class Beam {
  constructor(direction, x, y) {
    this.dir = direction
    this.x = x
    this.y = y
    // console.log(`Beam created at x: ${x} and y: ${y}`)
  }
  set setDir(newDir) {
    this.dir = newDir
  }
  setLocation(_x, _y) {
    this.x = _x
    this.y = _y
  }
}
const grid = initializeGrid(data)

let maxNumberEnergizedTiles = 0

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    let startingBeam
    if (i == 0 && j == 0) {
      const dirs = ['x', '-y']
      for (let dir of dirs) {
        startingBeam = new Beam(dir, j, i)
        let numberOfTiles = countEnergizedTiles(startingBeam)
        console.log(`Starting beam results in ${numberOfTiles}`)
        maxNumberEnergizedTiles = checkMaxSize(
          numberOfTiles,
          maxNumberEnergizedTiles
        )
        console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
      }
    } else if (i == grid.length - 1 && j == 0) {
      const dirs = ['x', 'y']
      for (let dir of dirs) {
        startingBeam = new Beam(dir, j, i)
        let numberOfTiles = countEnergizedTiles(startingBeam)
        console.log(`Starting beam results in ${numberOfTiles}`)
        maxNumberEnergizedTiles = checkMaxSize(
          numberOfTiles,
          maxNumberEnergizedTiles
        )
        console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
      }
    } else if (i == 0 && j == grid[0].length - 1) {
      const dirs = ['-x', '-y']
      for (let dir of dirs) {
        startingBeam = new Beam(dir, j, i)
        let numberOfTiles = countEnergizedTiles(startingBeam)
        console.log(`Starting beam results in ${numberOfTiles}`)
        maxNumberEnergizedTiles = checkMaxSize(
          numberOfTiles,
          maxNumberEnergizedTiles
        )
        console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
      }
    } else if (i == grid.length - 1 && j == grid[0].length - 1) {
      const dirs = ['-x', 'y']
      for (let dir of dirs) {
        startingBeam = new Beam(dir, j, i)
        let numberOfTiles = countEnergizedTiles(startingBeam)
        console.log(`Starting beam results in ${numberOfTiles}`)
        maxNumberEnergizedTiles = checkMaxSize(
          numberOfTiles,
          maxNumberEnergizedTiles
        )
        console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
      }
    } else if (i == 0) {
      startingBeam = new Beam('-y', j, i)
      let numberOfTiles = countEnergizedTiles(startingBeam)
      console.log(`Starting beam results in ${numberOfTiles}`)
      maxNumberEnergizedTiles = checkMaxSize(
        numberOfTiles,
        maxNumberEnergizedTiles
      )

      console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
    } else if (i == grid.length - 1) {
      startingBeam = new Beam('y', j, i)
      let numberOfTiles = countEnergizedTiles(startingBeam)
      console.log(`Starting beam results in ${numberOfTiles}`)
      maxNumberEnergizedTiles = checkMaxSize(
        numberOfTiles,
        maxNumberEnergizedTiles
      )
      console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
    } else if (j == 0) {
      startingBeam = new Beam('x', j, i)
      let numberOfTiles = countEnergizedTiles(startingBeam)
      console.log(`Starting beam results in ${numberOfTiles}`)
      maxNumberEnergizedTiles = checkMaxSize(
        numberOfTiles,
        maxNumberEnergizedTiles
      )
      console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
    } else if (j == grid[0].length - 1) {
      startingBeam = new Beam('-x', j, i)
      let numberOfTiles = countEnergizedTiles(startingBeam)
      console.log(`Starting beam results in ${numberOfTiles}`)
      maxNumberEnergizedTiles = checkMaxSize(
        numberOfTiles,
        maxNumberEnergizedTiles
      )
      console.log(`Current max beam is ${maxNumberEnergizedTiles}`)
    }
  }
}
console.log(`Max number of energized tiles found: ${maxNumberEnergizedTiles}`)

function checkMaxSize(num, max) {
  let newMax = 0
  if (num > max) {
    newMax = num
  } else {
    newMax = max
  }
  return newMax
}

function countEnergizedTiles(startingBeam) {
  const beams = []
  const energizedTiles = new Set()
  const watchDogCount = 10
  let numOfEnergizedTiles = 0
  let noChangeCount

  const initialBeam = startingBeam
  beams.push(initialBeam)
  energizedTiles.add(`${initialBeam.x},${initialBeam.y}`)
  let firstMove = true

  do {
    for (let beam of beams) {
      if (!firstMove) {
        moveBeam(beam)
      }
      if (beam.dir == 0) {
        continue
      }

      const beamLocation = [beam.x, beam.y]
      // console.log(`location: x: ${beam.x}, y: ${beam.y}`)
      if (grid[beam.y][beam.x] == '/') {
        if (beam.dir == 'x') {
          beam.dir = 'y'
        } else if (beam.dir == '-x') {
          beam.dir = '-y'
        } else if (beam.dir == 'y') {
          beam.dir = 'x'
        } else if (beam.dir == '-y') {
          beam.dir = '-x'
        }
      } else if (grid[beam.y][beam.x] == '\\') {
        if (beam.dir == 'x') {
          beam.dir = '-y'
        } else if (beam.dir == '-x') {
          beam.dir = 'y'
        } else if (beam.dir == 'y') {
          beam.dir = '-x'
        } else if (beam.dir == '-y') {
          beam.dir = 'x'
        }
      } else if (grid[beam.y][beam.x] == '-') {
        if (beam.dir == 'y') {
          beam.dir = 'x'
          beams.push(new Beam('-x', beam.x, beam.y))
        } else if (beam.dir == '-y') {
          beam.dir = '-x'
          beams.push(new Beam('x', beam.x, beam.y))
        }
      } else if (grid[beam.y][beam.x] == '|') {
        if (beam.dir == 'x') {
          beam.dir = 'y'
          beams.push(new Beam('-y', beam.x, beam.y))
        } else if (beam.dir == '-x') {
          beam.dir = '-y'
          beams.push(new Beam('y', beam.x, beam.y))
        }
      }

      const energizedTile = beamLocation.toString()
      if (!energizedTiles.has(energizedTile)) {
        energizedTiles.add(energizedTile)
      }
    }
    if (energizedTiles.size > numOfEnergizedTiles) {
      numOfEnergizedTiles = energizedTiles.size
      noChangeCount = 0
    } else {
      noChangeCount++
    }
    firstMove = false
    // console.log(`Total number of energized tiles: ${energizedTiles.size}\n`)
  } while (noChangeCount < watchDogCount)
  return numOfEnergizedTiles
}

function moveBeam(beam) {
  if (beam.dir == 'x') {
    beam.x++
  } else if (beam.dir == '-x') {
    beam.x--
  } else if (beam.dir == 'y') {
    beam.y--
  } else if (beam.dir == '-y') {
    beam.y++
  } else {
    // console.error('Beam does not have a direction set.')
  }
  if (beam.x >= grid[0].length || beam.x < 0) {
    beam.dir = 0
  } else if (beam.y >= grid.length || beam.y < 0) {
    beam.dir = 0
  }
}

function initializeGrid(data) {
  const lines = data.split('\n')
  const grid = []
  for (let line = 0; line < lines.length; line++) {
    grid.push(lines[line].split(''))
  }
  return grid
}
