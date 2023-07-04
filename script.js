"use strict"

const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.querySelector("#score--0")
const score1El = document.getElementById("score--1")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnShowModal = document.querySelector(".btn--show-modal")
const btnCloseModal = document.querySelector(".btn--close-modal")

score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add("hidden")

let scores, currentScore, activePlayer, playing

const init = function () {
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  playing = true

  diceEl.classList.add("hidden")
  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0
  player0El.classList.remove("player--winner")
  player1El.classList.remove("player--winner")
  player0El.classList.add("player--active")
  player1El.classList.remove("player--active")
}
init()

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0El.classList.toggle("player--active")
  player1El.classList.toggle("player--active")
}

const showModal = function () {
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
}

const closeModal = function () {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1
    diceEl.classList.remove("hidden")
    diceEl.src = `images/dice-${dice}.png`

    if (dice !== 1) {
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      switchPlayer()
    }
  }
})

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    if (scores[activePlayer] >= 100) {
      playing = false
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner")
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active")
    } else {
      switchPlayer()
    }
  }
})

btnNew.addEventListener("click", init)

btnShowModal.addEventListener("click", showModal)

btnCloseModal.addEventListener("click", closeModal)

overlay.addEventListener("click", closeModal)

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal()
  }
})
