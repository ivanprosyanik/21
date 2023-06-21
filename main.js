const coloda = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const btnGetCard = document.getElementById('get-card');
const btnStop = document.getElementById('stop');
const btnNewGame = document.getElementById('new-game');
const restartGame = document.getElementById('restart');

const betInput = document.getElementById('input-bet');
const cash = document.getElementById('your-cash');

const resultPlayer = document.getElementById('result-player');
const resultPc = document.getElementById('result-pc');
const resultGame = document.getElementById('result-game');

let playerMoney = 100;
let bet = 0;
let playerCard = 0;
let computerNumber = 0;


betInput.min = 1;
betInput.max = playerMoney;

function getCard() {
  let card = coloda[Math.floor(Math.random() * coloda.length)];
  return card
}

function player() {
  if (bet === 0) {
    bet += 1
    playerMoney -= betInput.value;
    cash.textContent = playerMoney;
  }
  playerCard += getCard()
  // console.log(`Your card: ${playerCard}`);
  resultPlayer.textContent = `${playerCard}`;
  playLose(playerCard);
}

function playLose(number) {
  if (number > 21) {
    // console.log('You lose');
    resultGame.textContent = 'Вы проиграли';
    btnGetCard.disabled = true;
    btnStop.disabled = true;
  }
};

function computer() {
  while (computerNumber <= 17) {
    computerNumber += getCard();
    // console.log(`Computer choise: ${computerNumber}`);
    resultPc.textContent = `${computerNumber}`;
  }
  checkCards()
}

function checkCards() {
  if (computerNumber > playerCard && computerNumber <= 21) {
    // console.log('You lose');
    resultGame.classList.add('active')
    resultGame.textContent = 'Вы проиграли';
    if (playerMoney <= 0) {
      restartGame.classList.add('active');
      btnNewGame.disabled = true;
    };
  } else if (computerNumber == playerCard && computerNumber <= 21) {
    console.log('This is draw!');
    resultGame.classList.add('active')
    resultGame.textContent = 'Ничья!';
    playerMoney += betInput.value;
    cash.textContent = playerMoney;
  } else if (playerCard > computerNumber && playerCard <= 21 || computerNumber > 21) {
    console.log('You win');
    resultGame.classList.add('active')
    resultGame.textContent = 'Победа!';
    let winMoney = betInput.value * 2;
    playerMoney += winMoney;
    cash.textContent = playerMoney;
  }
  btnGetCard.disabled = true;
  btnStop.disabled = true;
}

function newGame() {
  if (playerMoney != 0) {
    playerCard = 0;
    computerNumber = 0;
    btnGetCard.disabled = false;
    btnStop.disabled = false;
    console.clear();
    bet = 0;
    cash.textContent = playerMoney;

    resultGame.classList.remove('active');
    resultPlayer.textContent = '';
    resultPc.textContent = '';
  } else {
    window.location.reload()
  }
}

btnGetCard.addEventListener('click', () => {
  if (betInput.value < 0 && bet == 0) {
    alert('Введите коректное число')
    betInput.value = 1;
  } else if (betInput.value > playerMoney && bet == 0) {
    alert('У вас недостаточно денег! 1')
  } else {
    player();
  }
});

btnStop.addEventListener('click', () => {
  if (playerCard === 0) {
    if (betInput.value <= playerMoney) {
      playerMoney -= betInput.value;
      cash.textContent = playerMoney;
    } else {
      alert('У вас недостаточно денег! 2')
      newGame()
    }
  } else {
    computer();
  }
});

btnNewGame.addEventListener('click', () => {
  newGame();
});

restartGame.addEventListener('click', () => {
  window.location.reload()
});