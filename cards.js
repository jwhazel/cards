class Deck {
  #cards = [];
  #suits = ["spades", "diamonds", "clubs", "hearts"];
  #ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  // Create the the deck using standard new deck order
  constructor() {
    this.#suits.forEach((suit) => {
      let rankOrder = this.#ranks;
      if (suit === "clubs" || suit === "hearts") {
        rankOrder = this.#ranks.toReversed();
      }
      rankOrder.forEach((rank) => {
        this.#cards.push({ rank, suit });
      });
    });
  }

  get cardsLeft() {
    return this.#cards.length;
  }

  // Shuffle the deck via Durstenfeld shuffle
  shuffle() {
    for (let i = this.#cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }

  // Draw n number of cards
  draw(n = 1) {
    if (n > this.cardsLeft) {
      throw new Error("Not enough cards left in deck");
    }
    return this.#cards.splice(0, n);
  }
}



function getHandValue(hand) {
  let handValue = 0;
  hand.forEach((rank) => {
    if (rank === "A") {
      if (handValue + 11 > 21) {
        handValue += 1;
      } else {
        handValue += 11;
      }
    } else if (["J", "Q", "K"].includes(rank)) {
      handValue += 10;
    } else {
      handValue += rank;
    }
  });
  
  return handValue;
}
