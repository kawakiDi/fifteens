const board        = document.querySelector('.board')
const patternBoard = Array(16).fill(0)
const keyPass      = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const config       = { time: 100, arrayLength: 15, positionX: 3, positionY: 3,}
let   gameBoard    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
let   isDone       = true

window.addEventListener('keydown', (event) => {
  if(isDone) {
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

  for (let i = 0; i < config.arrayLength;) {
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
  for( let i = 0; i < config.arrayLength; i++ ) {
    if( Number(board.children[i].innerText) !== i + 1) {
      return console.log( 'Not yeat!' )
    }
  }
  return console.log( 'You win!' )
}

function checkinErrors(array) {
  let countErrors = 0

  for (let i = 0; i < config.arrayLength; i++) {
    if (array[i] > array[i + 1]) {
      countErrors++
    } else {
      continue
    }
  }

  if (countErrors % 2 === 0) {
    setNumbers(array)
  } else {
    startGame()
  }
}

function setNumbers(array) {
  for ( let i = 0; i < config.arrayLength; i++ ) {
    board.children[i].innerText = array[i]
  }
}

function keyOut(event) {
  if( keyPass.includes( event.key ) ) {
    const boardCards = board.children
    let   emptyCell  = findEmptyCell()
    
    if( event.key === 'ArrowLeft' ) {
      let filledCell = emptyCell - 1
      
      if( config.positionX > 0 ) {
        config.positionX--

        isDone = !isDone

        boardCards[ emptyCell  ].classList.toggle( 'motion-left' )
        boardCards[ filledCell ].classList.toggle( 'motion-right' )

        setTimeout(() => {
          boardCards[ emptyCell  ].style.order--
          boardCards[ filledCell ].style.order++
        
          boardCards[ emptyCell  ].classList.toggle( 'motion-left' )
          boardCards[ filledCell ].classList.toggle( 'motion-right' )
        
          boardCards[ filledCell ].before( boardCards[ emptyCell ] )

          isDone = !isDone
        }, config.time)
      }
    }

    if( event.key === 'ArrowRight' ) {
      let filledCell = emptyCell + 1

      if( config.positionX < 3 ) {
        config.positionX++

        isDone = !isDone

        boardCards[ emptyCell  ].classList.toggle( 'motion-right' )
        boardCards[ filledCell ].classList.toggle( 'motion-left' )

        setTimeout(() => {
          boardCards[ emptyCell  ].style.order++
          boardCards[ filledCell ].style.order--
        
          boardCards[ emptyCell  ].classList.toggle( 'motion-right' )
          boardCards[ filledCell ].classList.toggle( 'motion-left' )
        
          boardCards[ filledCell ].after( boardCards[ emptyCell ] )

          isDone = !isDone
        }, config.time)

      }
    }

    if( event.key === 'ArrowUp' ) {
      let filledCell = emptyCell - 4

      if( config.positionY > 0 ) {
        config.positionY--

        isDone = !isDone

        boardCards[ emptyCell  ].classList.toggle( 'motion-up' )
        boardCards[ filledCell ].classList.toggle( 'motion-down' )

        setTimeout(() => {
        boardCards[ emptyCell  ].style.order = Number(boardCards[ emptyCell ].style.order) - 4
        boardCards[ filledCell ].style.order = Number(boardCards[ filledCell ].style.order) + 4

        boardCards[ emptyCell  ].classList.toggle( 'motion-up' )
        boardCards[ filledCell ].classList.toggle( 'motion-down' )

        boardCards[ filledCell ].before( boardCards[ emptyCell ] )
        boardCards[ emptyCell  ].after( boardCards[ filledCell + 1 ] )

        isDone = !isDone
        }, config.time)
      }
    }

    if (event.key === 'ArrowDown') {
      let filledCell = emptyCell + 4

      if( config.positionY < 3 ) {
        config.positionY++

        isDone = !isDone

        boardCards[ emptyCell ].classList.toggle( 'motion-down' )
        boardCards[ filledCell ].classList.toggle( 'motion-up' )

        setTimeout(() => {
        boardCards[ emptyCell ].style.order  = Number(boardCards[ emptyCell ].style.order) + 4
        boardCards[ filledCell ].style.order = Number(boardCards[ filledCell ].style.order) - 4

        boardCards[ emptyCell ].classList.toggle( 'motion-down' )
        boardCards[ filledCell ].classList.toggle( 'motion-up' )

        boardCards[ filledCell - 1 ].after( boardCards[ emptyCell ] )
        boardCards[ emptyCell ].before( boardCards[ filledCell ] )

        isDone = !isDone
        }, config.time)
      }
    }
  }
}

function findEmptyCell() {
  for ( let i = 0; i <= config.arrayLength; i++ ) {
    if( Number( board.children[i].innerText ) === 0 ) {
      return i
    }
  }
}

function clickOut(event) {
  if( event.target.classList.value.includes('start') ) {
    for( let i = 0; i < config.arrayLength; i++ ) {
      board.children[i].classList.remove( 'board__card--epty' )
    }

    board.children[config.arrayLength].classList.add( 'board__card--epty' )

    board.children[config.arrayLength].innerText = 0

    config.positionX = 3
    config.positionY = 3

    startGame()
  }

  if( event.target.classList.value.includes('finish') ) {
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