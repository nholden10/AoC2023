const readline = require('readline')
const fs = require('fs')

const writtenNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

let sumOfCoords = 0
let count = 1

const readInterface = readline.createInterface({
  input: fs.createReadStream('day1input.txt'),
  console: false,
})

readInterface.on('line', function (line) {
  let coord = ''
  console.log('line number: ', count, '\nOriginal line: ', line)
  count++

  let lowerConvertedLine = convertWrittenLower(line)
  let firstDigit = getFirstDigit(lowerConvertedLine)
  console.log(`First digit is ${firstDigit}\n\n`)

  let upperConvertedLine = convertWrittenUpper(line)
  let secondDigit = getSecondDigit(upperConvertedLine)
  console.log(`Second digit is ${secondDigit}\n\n`)

  coord = firstDigit.concat(secondDigit)
  console.log('Line Coord: ', coord)
  sumOfCoords = sumOfCoords + parseInt(coord)
  console.log('Sum of Coords: ', sumOfCoords, '\n\n')

  function getFirstDigit(line) {
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(line[i])) {
        return line[i]
      }
    }
  }

  function getSecondDigit(line) {
    for (let i = line.length - 1; i >= 0; i--) {
      if (!isNaN(line[i])) {
        return line[i]
      }
    }
  }

  // Converts the lowest index written out number Ex) "four" to the number 4.
  function convertWrittenLower(line) {
    let replaceTerm = ''
    let searchTerm
    let smallestIndex
    let smallestVal
    console.log('\nSearching for match from the left...')

    const matches = []
    for (const num in writtenNumbers) {
      searchTerm = `${num}`
      let index = line.indexOf(searchTerm)
      if (index > -1) {
        console.log(`Match found for ${searchTerm} at index ${index}`)
        matches.push([searchTerm, index])
      }
    }
    if (matches[0]) {
      smallestIndex = matches[0][1]
      smallestVal = matches[0][0]
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1] < smallestIndex) {
          smallestIndex = matches[i][1]
          smallestVal = matches[i][0]
        }
      }
      console.log(
        `\nSmallest index match is ${smallestVal} at index ${smallestIndex}`
      )

      replaceTerm = `${writtenNumbers[smallestVal]}`
      line = line.replace(smallestVal, replaceTerm)

      console.log('Converted Line: ', line)
    } else {
      console.log('No matches found')
    }

    return line
  }

  // Converts the highest index written out number Ex) "four" to the number 4.
  function convertWrittenUpper(line) {
    let replaceTerm = ''
    let searchTerm
    let highestIndex
    let highestVal
    console.log('\nSearching for match from the right...')

    const matches = []
    for (const num in writtenNumbers) {
      searchTerm = `${num}`
      let index = line.lastIndexOf(searchTerm)
      if (index > -1) {
        console.log(`Match found for ${searchTerm} at index ${index}`)
        matches.push([searchTerm, index])
      }
    }
    if (matches[0]) {
      highestIndex = matches[0][1]
      highestVal = matches[0][0]

      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1] > highestIndex) {
          highestIndex = matches[i][1]
          highestVal = matches[i][0]
        }
      }

      console.log(
        `Highest index match is ${highestVal} at index ${highestIndex}\n`
      )

      replaceTerm = `${writtenNumbers[highestVal]}`
      let beginningString = line.slice(0, highestIndex)
      let endString = line.slice(highestIndex + highestVal.length)
      line = beginningString + replaceTerm + endString

      console.log('Converted Line: ', line, '\n\n')
    } else {
      console.log('No matches found')
    }

    return line
  }
})
