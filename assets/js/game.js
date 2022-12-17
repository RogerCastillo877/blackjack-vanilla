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
const htmlPoints = document.querySelectorAll('small');
const divPlayerCard = document.querySelector('#card-player');
const divPcCard = document.querySelector('#card-pc');

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

const pcTurn = ( minimumPoints ) => {
  
  do {
    const card = requestCard();
    
    pcPoints = pcPoints + cardValue( card );
    
    htmlPoints[1].innerText = pcPoints;

    const newCard = document.createElement('img');
    newCard.src = `./assets/img/cartas/${card}.png`;
    newCard.alt = `${card} player card image`;
    newCard.classList.add('card');
    divPcCard.appendChild(newCard);
    btnRequest.disabled = true;

    if( minimumPoints > 21 ) {
      break;
    }

  } while ( (pcPoints <= minimumPoints) && ( minimumPoints <= 21 ) );

  setTimeout(() => {
    if(minimumPoints === 21 && pcPoints !== 21 ) return alert('Player Gana');
    ( pcPoints === minimumPoints ) && alert('Pc Gana');
    ( minimumPoints > 21 ) && alert('Pc Gana');
    if ( pcPoints > 21 ) { return alert('Player Gana')};
    ( minimumPoints > pcPoints && minimumPoints <= 21 ) ? alert('Player Gana') : alert('Pc Gana');
  }, 100);
}

btnRequest.addEventListener('click', () => {
  const card = requestCard();
  playerPoints = playerPoints + cardValue( card );
  htmlPoints[0].innerText = playerPoints;

  const newCard = document.createElement('img');
  newCard.src = `./assets/img/cartas/${card}.png`;
  newCard.alt = `${card} player card image`;
  newCard.classList.add('card');
  divPlayerCard.appendChild(newCard);

  if( playerPoints >= 21 ) {
    console.warn('Lo siento, perdiste :(');
    alert('Lo siento, perdiste :(');
    btnRequest.disabled = true;
    btnStop.disabled = true;
    pcTurn(playerPoints);
  } else if ( playerPoints === 21 ) {
    console.warn('21, ¡genial!')
    btnRequest.disabled = true;
    btnStop.disabled = true;
    pcTurn(playerPoints);
  }
});

btnStop.addEventListener('click', () => {
  btnStop.disabled = true;
  pcTurn(playerPoints);
});

btnNew.addEventListener('click', () => {
  deck = []
  deck = createDeck();
  playerPoints = 0;
  pcPoints = 0;
  htmlPoints[0].innerText = 0;
  htmlPoints[1].innerText = 0;
  btnRequest.disabled = false;
  btnStop.disabled = false;
  divPlayerCard.innerHTML = '';
  divPcCard.innerHTML = '';
})