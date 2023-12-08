
const fs = require('fs')

const filename = 'sample.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)

const seeds = lines[0].split(' ')
seeds.splice(0, 1)
console.log(seeds)
const totalLines = lines.length - 2
let lineCount = 3
while (lineCount < totalLines) {
  const currentLine = lines[lineCount]
  if (currentLine.includes('map')) {
    seeds = runMapping(seeds, currentLine)
  } else if (currentLine == '') {
    continue
  } else if (currentLine == '') {
    continue
  }
}

function runMapping(seeds, line) {
  const mappedSeeds = []
  const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ')

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i]
  //  if (!seed.includes("m") && seed >= sourceRangeStart && seed < sourceRangeStart + rangeLength) {
      let newSeed = destinationRangeStart + (seed - sourceRangeStart) + "m"
      mappedSeeds.push(newSeed)
    } else {
      mappedSeed
    }
  }
  return mappedSeeds
}
