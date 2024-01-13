const fs = require('fs')

const filename = 'sample.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)
const TOTAL_LINES = lines.length

let seeds = lines[0].split(' ')
seeds.splice(0, 1)

let lineCount = 2
while (lineCount < TOTAL_LINES) {
  console.log(lineCount)
  const [mappings, offset] = getMaps(lineCount, lines)
  seeds = runMappings(seeds, mappings)
  console.log(`New Seeds: ${seeds}`)
  lineCount = lineCount + offset + 1
}
console.log(`Lowest mapped number: ${Math.min(...seeds)}`)

function getMaps(lineCount, lines) {
  const mappings = []
  let count = 1
  // console.log(`lineCount: ${lineCount}, count: ${count}`)
  while (
    lineCount + count < TOTAL_LINES &&
    lines[lineCount + count].length > 1
  ) {
    const currentMap = lines[lineCount + count]
      .split(' ')
      .map((item) => parseInt(item))
    mappings.push(currentMap)
    count++
  }
  return [mappings, count]
}

function runMappings(seeds, mappings) {
  const mappedSeeds = []
  SeedLoop: for (let seed in seeds) {
    const currentSeed = parseInt(seeds[seed])
    for (let map in mappings) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] =
        mappings[map]
      // console
      //   .log
      //   // `current Seed: ${currentSeed}\nsourceRangeStart: ${sourceRangeStart}, destinationRangeStart: ${destinationRangeStart}, range: ${rangeLength}`
      //   ()
      if (
        currentSeed >= sourceRangeStart &&
        currentSeed < sourceRangeStart + rangeLength
      ) {
        let newSeed = destinationRangeStart + (currentSeed - sourceRangeStart)
        console.log(`In range, seed mapped to ${newSeed}`)
        mappedSeeds.push(newSeed)
        continue SeedLoop
      } else {
        continue
      }
    }
    mappedSeeds.push(currentSeed)
  }
  console.log(`Seeds mapped to: ${seeds}`)
  return mappedSeeds
}
