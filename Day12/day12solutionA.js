const readline = require('readline')
const fs = require('fs')

let sumOfArrangements = 0

const FILENAME = 'sample.txt'

const readInterface = readline.createInterface({
  input: fs.createReadStream(FILENAME),
  console: false,
})

readInterface.on('line', function (line) {
    const [gears, contiguousGroups] = getLineData(line)
    const gearLength = gears.length
    
    
})

function getLineData(line) {
  const data = line.split(' ')
  const gearLine = data[0].split('')
  const contiguousGroups = data[1].split(',')
  return [gearLine, contiguousGroups]
}

function isArrangementValid(arrangement, contiguousGroups) {
    let index = 0
    for (let group of contiguousGroups) {
        while (index <= arrangement.length) {
            arrangement.indexOf(, index)
            
        }
    }
    return true
}
