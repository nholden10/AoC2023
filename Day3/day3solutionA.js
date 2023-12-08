const fs = require('fs')

const filename = 'day3input.txt'

const data = fs.readFileSync(filename, 'utf8')

const rows = data.split(/\n/)
const schematic = rows.map((row) => row.split(''))

let position = schematic[0][0]
let sum = 0

for (let row = 0; row < schematic.length; row++) {
  for (let col = 0; col < schematic[0].length; col++) {
    position = schematic[row][col]
    if (!isNaN(position)) {
      let number = extractNumber(schematic, row, col)
      if (isPartNumber(schematic, row, col, number)) {
        sum = sum + parseInt(number)
        console.log(`Current sum: ${sum}`)
      }
      col = col + number.length
    }
  }
}

console.log(`Sum of part numbers: ${sum}`)

function extractNumber(schematic, row, col) {
  let number = schematic[row][col]
  console.log(number)
  for (let i = col + 1; i <= schematic[0].length; i++) {
    if (!isNaN(schematic[row][i])) {
      number = number.concat(schematic[row][i])
      console.log(number)
    } else {
      return number
    }
  }
}

function isPartNumber(schematic, row, col, number) {
  //console.log(number)
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j < col + number.length + 1; j++) {
      if (i > -1 && i < schematic.length && j > -1 && j < schematic[0].length) {
        console.log(`Row: ${i}, Col: ${j}`)
        let c = schematic[i][j]
        if (c != '.' && isNaN(c) == true) {
          console.log(
            `Number: ${number} is a valid part due to touching ${c} at row ${i} and column ${j}`
          )
          return true
        }
      }
    }
  }
  console.log(`Number: ${number} is NOT a valid part`)
  return false
}
