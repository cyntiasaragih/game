const board = Array(9).fill(null)
let currentPlayer = "🐬"
let gameOver = false

const gameBoard = document.getElementById("game-board")
const statusText = document.getElementById("status")
const resetButton = document.getElementById("reset")
const homeButton = document.getElementById("home")

document.getElementById('startButton').addEventListener('click', startGame)

function startGame() {
  document.querySelector('.welcome-screen').style.display = 'none'
  document.getElementById('game-screen').style.display = 'block'
  document.getElementById('reset').style.display = 'inline-block'
  document.getElementById('home').style.display = 'inline-block'
  gameBoard.innerHTML = ''
  board.fill(null)
  currentPlayer = "🐬"
  gameOver = false
  statusText.textContent = `${currentPlayer} Giliran bermain`
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i
    gameBoard.appendChild(cell)
    cell.addEventListener("click", () => makeMove(i, cell))
  }
}

function makeMove(index, cell) {
  if (gameOver || board[index]) return
  board[index] = currentPlayer
  cell.textContent = currentPlayer
  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} menang! 🎉`
    gameOver = true
    const fireworks = document.getElementById("fireworks")
    fireworks.style.display = "block"
    setTimeout(() => {
      fireworks.style.display = "none"
      document.getElementById('game-screen').style.display = 'none'
      document.querySelector('.welcome-screen').style.display = 'block'
      document.getElementById('reset').style.display = 'none'
      document.getElementById('home').style.display = 'none'
    }, 2000)
  } else if (board.every(cell => cell)) {
    statusText.textContent = "Seri! 😅"
    gameOver = true
    setTimeout(() => {
      document.getElementById('game-screen').style.display = 'none'
      document.querySelector('.welcome-screen').style.display = 'block'
      document.getElementById('reset').style.display = 'none'
      document.getElementById('home').style.display = 'none'
    }, 2000)
  } else {
    currentPlayer = currentPlayer === "🐬" ? "🦀" : "🐬"
    statusText.textContent = `${currentPlayer} Giliran bermain`
  }
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]
  return wins.some(combo =>
    combo.every(i => board[i] === currentPlayer)
  )
}

resetButton.addEventListener("click", () => {
  board.fill(null)
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "")
  currentPlayer = "🐬"
  statusText.textContent = `${currentPlayer} Giliran bermain`
  gameOver = false
})

homeButton.addEventListener("click", () => {
  document.getElementById("game-screen").style.display = "none"
  document.querySelector(".welcome-screen").style.display = "block"
  document.getElementById('reset').style.display = 'none'
  document.getElementById('home').style.display = 'none'
  board.fill(null)
  gameBoard.innerHTML = ""
  currentPlayer = "🐬"
  statusText.textContent = `${currentPlayer} Giliran bermain`
  gameOver = false
})
