const readline = require('readline')
const fs = require('fs')

let sumOfArrangements = 0

const FILENAME = 'sample.txt'

const readInterface = readline.createInterface({
  input: fs.createReadStream(FILENAME),
  console: false,
})

readInterface.on('line', function (line) {
  const [gearLine, contiguousGroups] = line.split(' ')
})
