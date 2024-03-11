document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const lineDisplay = document.querySelector('#line-score')
  const width = 10
  let nextRandom = 0
  let timerId
  let lines = 0
  let score = 0
  const colors = [
    '#f79533',
    '#f37055',
    '#ef4e7b',
    '#a166ab',
    '#5073b8'
  ]

})