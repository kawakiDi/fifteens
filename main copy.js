const board     = document.querySelector('.board')
const gameBoard = [
  [ 1,  2,  3,  4   ],
  [ 5,  6,  7,  8   ],
  [ 9,  10, 11, 12  ],
  [ 13, 14, 15, ' ' ],
]
const controlBoard = [
  [ 1,  2,  3,  4   ],
  [ 5,  6,  7,  8   ],
  [ 9,  10, 11, 12  ],
  [ 13, 14, 15, ' ' ],
]
const keyPass   = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']
const clickPass = ['start','finish']
      
const forRandomNumber = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNumbers(array) {
  let indexCell = 0

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++, indexCell++) {
      board.children[indexCell].innerText = array[i][j]
    }
  }
}

function findEmptyCell(array) {
  let indexCell = 0

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(array[i][j] === ' ') {
        return [i, j]
      }
    }
  }
}

function keyOut(event) {
  if( keyPass.includes(event.key) ) {

    if( event.key === 'ArrowLeft') {
      let locationEmptyCell = findEmptyCell(gameBoard)
      let axisY             = locationEmptyCell[0]
      let axisX             = locationEmptyCell[1]
      let hold              = ''

      if (axisX !== 0) {
        hold                        = gameBoard[axisY][axisX]
        gameBoard[axisY][axisX]     = gameBoard[axisY][axisX - 1]
        gameBoard[axisY][axisX - 1] = hold
      }

      setNumbers(gameBoard)
    }
  }
    if( event.key === 'ArrowRight') {
      let locationEmptyCell = findEmptyCell(gameBoard)
      let axisY             = locationEmptyCell[0]
      let axisX             = locationEmptyCell[1]
      let hold              = ''

      if (axisX !== 3) {
      hold                        = gameBoard[axisY][axisX]
      gameBoard[axisY][axisX]     = gameBoard[axisY][axisX + 1]
      gameBoard[axisY][axisX + 1] = hold
      }

      setNumbers(gameBoard)
    }
    if( event.key === 'ArrowUp') {
      let locationEmptyCell = findEmptyCell(gameBoard)
      let axisY             = locationEmptyCell[0]
      let axisX             = locationEmptyCell[1]
      let hold              = ''

      if (axisY !== 0) {
      hold                        = gameBoard[axisY][axisX]
      gameBoard[axisY][axisX]     = gameBoard[axisY - 1][axisX]
      gameBoard[axisY - 1][axisX] = hold
      }

      setNumbers(gameBoard)
    }
    if( event.key === 'ArrowDown') {
      let locationEmptyCell = findEmptyCell(gameBoard)
      let axisY             = locationEmptyCell[0]
      let axisX             = locationEmptyCell[1]
      let hold              = ''

      if (axisY !== 3) {
      hold                        = gameBoard[axisY][axisX]
      gameBoard[axisY][axisX]     = gameBoard[axisY + 1][axisX]
      gameBoard[axisY + 1][axisX] = hold
      }

      setNumbers(gameBoard)
    }
  }

function clickOut(event) {
  if( event.target.classList.value.includes('start') ) {
    console.log(event.target.innerText)
    startGame()
  }
  if( event.target.classList.value.includes('finish') ) {
    console.log(event.target.innerText)
    endGame()
  }
}

function startGame() {
  let emptyArray = [...forRandomNumber]
  let indexCell  = 0

  for (let i = 0; i !== 15;) {
    let number = getRandomNumber(1, 15)

    if (emptyArray.includes(number)) {
      confirm
    } else {
      emptyArray[i] = number
      i++
    }
  }

  console.log(emptyArray)

  let check = checkinErrors(emptyArray)

  if (check) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++, indexCell++) {
        gameBoard[i][j] = emptyArray[indexCell]
      }
    }

    gameBoard[3][3] = ' '

    setNumbers(gameBoard)
  }
}

function endGame() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if ( gameBoard[i][j] !== controlBoard[i][j] ) {
        return console.log('No yeat!')
      }
    }
  }

  return console.log('You win!')
}

function checkinErrors(array) {
  let count = 0

  for (let i = 0; i < 15 ; i++) {
    if( array[i] > array[i + 1] ) {
      count++
    } else {
      continue
    }
  }

  if(count % 2 === 0) {
    return count = true
  } else {
    startGame()
  }
}

setNumbers(gameBoard)

window.addEventListener('keydown', keyOut)

window.addEventListener('click', clickOut)

  // console.log(board)