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
const beams = []
const energizedTiles = new Set()
const watchDogCount = 10
let numOfEnergizedTiles = 0
let noChangeCount

const initialBeam = new Beam('x', 0, 0)
beams.push(initialBeam)
energizedTiles.add('0,0')
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
    // console.log(`beamX: ${beam.x}, beamY: ${beam.y}`)
    // console.log(`grid[beam.y][beam.x] = ${grid[beam.y][beam.x]}`)
    if (grid[beam.y][beam.x] == '/') {
      //   console.log(`Beam reflecting at x: ${beam.x} and y: ${beam.y}`)
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
      //   console.log(`Beam reflecting at x: ${beam.x} and y: ${beam.y}`)
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
      //   console.log(energizedTiles)
    }
  }
  if (energizedTiles.size > numOfEnergizedTiles) {
    numOfEnergizedTiles = energizedTiles.size
    noChangeCount = 0
  } else {
    noChangeCount++
  }
  firstMove = false
  console.log(`Total number of energized tiles: ${energizedTiles.size}\n`)
} while (noChangeCount < watchDogCount)
// for (let value of energizedTiles.values()) {
//   console.log(value)
// }
// console.log(`Energized tiles: ${energizedTiles.values()}`)

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
