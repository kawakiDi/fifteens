const board        = document.querySelector('.board')
const patternBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const keyPass      = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const config       = { time: 100, }
let   gameBoard    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let   ifDone       = true


window.addEventListener('keydown', (event) => {
  if(ifDone) {
    keyOut(event)
  }
})

window.addEventListener('click', clickOut)

setNumbers(gameBoard)

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  gameBoard = [...patternBoard]

  for (let i = 0; i !== 15;) {
    let number = getRandomNumber(1, 15)

    if (gameBoard.includes(number)) {
      confirm
    } else {
      gameBoard[i] = number
      i++
    }
  }

  checkinErrors(gameBoard)

  console.log(gameBoard)
}

function endGame() {
  for( let i = 0; i < 15; i++ ) {
    if( Number(board.children[i].innerText) !== i + 1) {
      return console.log( 'Not yeat!' )
    }
  }
  return console.log( 'You win!' )
}

function checkinErrors(array) {
  let count = 0

  for (let i = 0; i < 15; i++) {
    if (array[i] > array[i + 1]) {
      count++
    } else {
      continue
    }
  }

  if (count % 2 === 0) {
    console.log( 'pass' )
    setNumbers(array)
  } else {
    startGame()
    console.log( 'not-pass' )
  }
}

function setNumbers(array) {
  for ( let i = 0; i < 15; i++ ) {
    board.children[i].innerText = array[i]
  }
}

function keyOut(event) {
  if (keyPass.includes(event.key)) {
    const boardCards = board.children
    let   emptyCell  = findEmptyCell()
    
    if (event.key === 'ArrowLeft') {
      let filledCell     = emptyCell - 1
      let checkBoardWall = emptyCell + filledCell
      
      if(checkBoardWall !== 23 && checkBoardWall !== 15 && checkBoardWall !== 7 && filledCell >= 0) {
        ifDone = !ifDone
        boardCards[ emptyCell  ].classList.toggle( 'motion-left' )
        boardCards[ filledCell ].classList.toggle( 'motion-right' )

        setTimeout(() => {
          boardCards[ emptyCell  ].style.order--
          boardCards[ filledCell ].style.order++
        
          boardCards[ emptyCell  ].classList.toggle( 'motion-left' )
          boardCards[ filledCell ].classList.toggle( 'motion-right' )
        
          boardCards[ filledCell ].before( boardCards[ emptyCell ] )

          ifDone = !ifDone
        }, config.time)

      }
    }

    if (event.key === 'ArrowRight') {
      let filledCell     = emptyCell + 1
      let checkBoardWall = emptyCell + filledCell

      if(checkBoardWall !== 23 && checkBoardWall !== 15 && checkBoardWall !== 7 && emptyCell != 15) {
        ifDone = !ifDone

        boardCards[ emptyCell ].classList.toggle( 'motion-right' )
        boardCards[ filledCell ].classList.toggle( 'motion-left' )

        setTimeout(() => {
          boardCards[ emptyCell ].style.order++
          boardCards[ filledCell ].style.order--
        
          boardCards[ emptyCell ].classList.toggle( 'motion-right' )
          boardCards[ filledCell ].classList.toggle( 'motion-left' )
        
          boardCards[ filledCell ].after( boardCards[ emptyCell ] )

          ifDone = !ifDone
        }, config.time)

      }
    }

    if (event.key === 'ArrowUp') {
      let filledCell = emptyCell - 4

      if( filledCell >= 0 ) {
        ifDone = !ifDone
        boardCards[ emptyCell ].classList.toggle( 'motion-up' )
        boardCards[ filledCell ].classList.toggle( 'motion-down' )

        setTimeout(() => {
        boardCards[ emptyCell ].style.order  = Number(boardCards[ emptyCell ].style.order) - 4
        boardCards[ filledCell ].style.order = Number(boardCards[ filledCell ].style.order) + 4

        boardCards[ emptyCell ].classList.toggle( 'motion-up' )
        boardCards[ filledCell ].classList.toggle( 'motion-down' )

        boardCards[ filledCell ].before( boardCards[ emptyCell ] )
        boardCards[ emptyCell ].after( boardCards[ filledCell + 1 ] )

        ifDone = !ifDone
        }, config.time)
      }
    }

    if (event.key === 'ArrowDown') {
      let filledCell = emptyCell + 4

      if( filledCell < 16 ) {
        ifDone = !ifDone
        boardCards[ emptyCell ].classList.toggle( 'motion-down' )
        boardCards[ filledCell ].classList.toggle( 'motion-up' )

        setTimeout(() => {
        boardCards[ emptyCell ].style.order  = Number(boardCards[ emptyCell ].style.order) + 4
        boardCards[ filledCell ].style.order = Number(boardCards[ filledCell ].style.order) - 4

        boardCards[ emptyCell ].classList.toggle( 'motion-down' )
        boardCards[ filledCell ].classList.toggle( 'motion-up' )

        boardCards[ filledCell - 1 ].after( boardCards[ emptyCell ] )
        boardCards[ emptyCell ].before( boardCards[ filledCell ] )

        ifDone = !ifDone
        }, config.time)
      }
    }

    // testFindErrors()
  }
}

function findEmptyCell() {
  for (let i = 0; i < 16; i++) {
    if (board.children[i].textContent === '') {
      return i
    }
  }
}

function clickOut(event) {
  if (event.target.classList.value.includes('start')) {
    board.lastElementChild.innerText = ''
    startGame()
  }
  if (event.target.classList.value.includes('finish')) {
    endGame()
  }
}

// let countErrors = 0

// function testFindErrors() {
//   for( let i = 0; i < 16; i++) {
//     let orderNum = Number( board.children[i].style.order )
//     if( orderNum !== i ) {
//       countErrors++
//     }
//   }
// }