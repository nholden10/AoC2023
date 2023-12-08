const fs = require('fs')

const filename = 'day9input.txt'
const data = fs.readFileSync(filename, 'utf8')

const dataset = data.split(/\n/)

const histories = []

let sumOfExtrapolatedHistories = 0

for (let i = 0; i < dataset.length; i++) {
  histories.push(dataset[i].split(' '))
  console.log(`History ${i + 1}: ${histories[i]}`)
}
console.log('\n')

for (let i = 0; i < histories.length; i++) {
  const history = histories[i]
  console.log(`History ${i + 1}: ${history}`)
  const rows = []
  rows.push(history)
  let count = 0

  do {
    const difference = computeDifferences(rows[count])
    rows.push(difference)
    count++
    console.log(`Differences: ${rows[count]}`)
  } while (areAllDifferencesZero(rows[count]) == false)
  //extrapolate
  const extrapolatedRows = extrapolate(rows)
  console.log(extrapolatedRows)
  sumOfExtrapolatedHistories =
    sumOfExtrapolatedHistories + extrapolatedRows[0][0]
}
console.log(`Sum of all extrapolated values: ${sumOfExtrapolatedHistories}`)

function extrapolate(rows) {
  const bottomRow = rows.length - 1
  let extrapolatedValue
  for (let i = bottomRow; i >= 0; i--) {
    if (i == bottomRow) {
      extrapolatedValue = 0
    } else {
      extrapolatedValue = parseInt(rows[i][0]) - parseInt(rows[i + 1][0])
    }
    rows[i].unshift(extrapolatedValue)
  }
  return rows
}

function areAllDifferencesZero(differences) {
  for (let i = 0; i < differences.length; i++) {
    if (differences[i] == '0') {
      continue
    } else {
      return false
    }
  }
  return true
}

function computeDifferences(history) {
  const differences = []
  for (let i = 0; i < history.length - 1; i++) {
    differences.push(parseInt(history[i + 1]) - parseInt(history[i]))
  }
  return differences
}
