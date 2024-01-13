const fs = require('fs')

const filename = 'sample.txt'
const data = fs.readFileSync(filename, 'utf8')

class Hand {
  constructor(cards, bid) {
    this.cards = cards
    this.bid = bid
  }
}

const CARD_RANKS = {
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

const hands = assembleHands(data)

function compareHands(hand_1, hand_2) {
  for (let i = 0; i < hand_1.length; i++) {}
}

function getTieBreakerWinner(hand_1, hand_2) {
  for (let i = 0; i < hand_1; i++) {
    if (NaN(card1)) {
      card1 = CARD_RANKS[card1]
    } else {
      card1 = parseInt(hand_1[i])
    }
    if (NaN(card2)) {
      card2 = CARD_RANKS[card2]
    } else {
      card2 = parseInt(hand_2[i])
    }
    if (card1 == card2) {
      continue
    }
    return card1 > card2 ? 1 : 2
  }
}

function assembleHands(data) {
  const lines = data.split(/\n/)
  const hands = []
  for (let i = 0; i < lines.length; i++) {
    const [cards, bid] = lines[i].split(' ')
    hands.push(new Hand(cards, bid))
  }
  return hands
}
