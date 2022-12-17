/*
* 2C = Two of Clubs (Tréboles)
* 2D = Two of Diamonds (Tréboles)
* 2H = Two of Hearts (Tréboles)
* 2S = Two of Spades (Tréboles)
*/

let deck =[];
const types = [ 'C', 'D', 'H', 'S' ];
const specials = [ 'A', 'J', 'Q','K' ];

let playerPoints = 0;
let pcPoints = 0;

const btnRequest = document.querySelector('#btnRequest');
const btnNew = document.querySelector('#btnNew');
const btnStop = document.querySelector('#btnStop');
const htmlPoints = document.querySelectorAll('small')

const createDeck = () => {
  for( let i = 2; i <= 10; i++ ) {
    for ( const type of types ) {
      deck.push( i+type )
    }
  }
  for ( const type of types ) {
    for ( const special of specials ) {
      deck.push( special + type )
    }
  }

  deck = _.shuffle( deck );
  return deck;
};

createDeck();

const requestCard = () => {
  if(deck.length === 0) {
    throw new Error('Doesn\'t have more cards')
  };

  const selectedCard = deck.pop();

  return selectedCard;
};

// requestCard();

const cardValue = ( card ) => {
  const value = card.substring(0, card.length -1);
  
  return ( isNaN( value) ) ?
          ( value=== 'A') ? 11 : 10
          : value * 1;
};

btnRequest.addEventListener('click', () => {
  const card = requestCard();
  playerPoints = playerPoints + cardValue( card );
  htmlPoints[0].innerText = playerPoints;
});
