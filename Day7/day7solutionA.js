const fs = require('fs')

const filename = 'day7input.txt'
const data = fs.readFileSync(filename, 'utf8')

class Hand {
  constructor(cards, bid, rank) {
    this.cards = cards
    this.bid = bid
    this.rank = rank
  }
}

const CARD_RANKS = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

let sum = 0

const hands = assembleHands(data)
console.log('Unsorted Hands:')
printHands(hands)
console.log('Sorted Hands:')
const sortedHands = sortHands(hands)
printHands(sortedHands)

for (let i = 0; i < sortedHands.length; i++) {
  sum = sum + sortedHands[i].bid * (i + 1)
  console.log(
    `Hand ${hands[i].cards}'s bid is ${hands[i].bid} and is in spot ${
      i + 1
    }, adding ${sortedHands[i].bid * (i + 1)}. Total sum: ${sum}`
  )
}
// 241099286
// 241344943
console.log(`Sum of total winnings is ${sum}`)

function printHands(hands) {
  console.log(`\n---Hands ordering---`)
  for (let i = 0; i < hands.length; i++) {
    console.log(`${hands[i].cards} is in spot ${i + 1}`)
  }
}

function sortHands(hands) {
  let swapped
  do {
    swapped = false
    for (let i = 0; i < hands.length - 1; i++) {
      console.log(
        `Comparing hands ${hands[i].cards} and ${hands[i + 1].cards}...`
      )
      if (hands[i].rank < hands[i + 1].rank) {
        ;[hands[i], hands[i + 1]] = [hands[i + 1], hands[i]]
        swapped = true
        console.log(
          `Hand ${hands[i].cards} is higher rank than ${
            hands[i + 1].cards
          }. Swapping spots\n`
        )
      } else if (hands[i].rank == hands[i + 1].rank) {
        console.log(`Tie in ranks, checking tiebreaker...`)
        if (getStrongerHand(hands[i], hands[i + 1])) {
          ;[hands[i], hands[i + 1]] = [hands[i + 1], hands[i]]

          swapped = true
          console.log(`Hand ${hands[i + 1].cards} won the tie breaker\n`)
        } else {
          console.log(`Hand ${hands[i].cards} won the tie breaker\n`)
        }
      }
    }
  } while (swapped)

  return hands
}

function getStrongerHand(hand_1, hand_2) {
  console.log(`Comparing hand 1: ${hand_1.cards} and hand 2: ${hand_2.cards}`)
  if (getTieBreakerWinner(hand_1.cards, hand_2.cards) == 1) {
    return true
  } else {
    return false
  }
}

function determineRank(hand) {
  console.log(`----------------------------------------------`)
  console.log(`determining rank of hand ${hand}`)
  let intermHand = hand
  let rank
  let mostMatches = 0
  let secondaryMatches = 0
  for (let i = 0; i < intermHand.length; i++) {
    const card = intermHand[i]
    if (card == '#') {
      continue
    }
    console.log(`Searching for matches of ${card}...`)
    let numOfMatches
    ;[intermHand, numOfMatches] = countMatches(card, intermHand)

    if (numOfMatches > 1) {
      console.log(`${numOfMatches} ${card}'s found`)
      if (numOfMatches > mostMatches) {
        secondaryMatches = mostMatches
        mostMatches = numOfMatches
      } else {
        secondaryMatches = numOfMatches
      }
      console.log(`Marked off matches, marked hand is ${intermHand}`)
      console.log(`Searching for additional three or pair...\n`)
    }
  }
  console.log(
    `${mostMatches} primary matches found.\n${secondaryMatches} secondary matches.`
  )
  return rankHand(mostMatches, secondaryMatches)
}

function rankHand(mostMatches, secondaryMatches) {
  let rank
  if (mostMatches == 5) {
    console.log(`Five of kind!`)

    rank = 1
  } else if (mostMatches == 4) {
    console.log(`Four of kind!`)

    rank = 2
  } else if (mostMatches == 3) {
    if (secondaryMatches == 2) {
      console.log(`Full House!`)
      rank = 3
    } else {
      console.log(`Three of kind!`)
      rank = 4
    }
  } else if (mostMatches == 2) {
    if (secondaryMatches == 2) {
      console.log(`Two pair!`)
      rank = 5
    } else {
      console.log(`One pair!`)
      rank = 6
    }
  } else {
    console.log(`High card only...`)
    rank = 7
  }
  return rank
}

function countMatches(card, intermHand) {
  let count = 0
  let markedHand = ''
  for (let i = 0; i < intermHand.length; i++) {
    if (intermHand[i] == card) {
      markedHand = markedHand + '#'
      count++
    } else {
      markedHand = markedHand + intermHand[i]
    }
  }
  // console.log(markedHand)
  return [markedHand, count]
}

function getTieBreakerWinner(hand_1, hand_2) {
  for (let i = 0; i < hand_1.length; i++) {
    let card1 = hand_1[i]
    let card2 = hand_2[i]
    if (isNaN(card1)) {
      card1 = CARD_RANKS[card1]
    } else {
      card1 = parseInt(hand_1[i])
    }
    if (isNaN(card2)) {
      card2 = CARD_RANKS[card2]
    } else {
      card2 = parseInt(hand_2[i])
    }
    if (card1 == card2) {
      continue
    }
    if (card1 > card2) {
      console.log(
        `${hand_1} won the tie breaker as ${card1} is stronger than ${card2}\n`
      )
      return 1
    } else {
      console.log(
        `${hand_2} won the tie breaker as ${card2} is stronger than ${card1}\n`
      )

      return -1
    }
    return card1 > card2 ? 1 : 2
  }
}

function assembleHands(data) {
  const lines = data.split(/\n/)
  const hands = []
  for (let i = 0; i < lines.length; i++) {
    const [cards, bid] = lines[i].split(' ')
    hands.push(new Hand(cards, bid, determineRank(cards)))
  }
  return hands
}
