const cardsArray= [

  { name: 'vue',src: './imagens/vue.svg', alt: 'vue',},
  { name: 'angular',src: './imagens/angular.svg', alt: 'Angular',},
  { name: 'react',src: './imagens/react.svg', alt: 'React',},
  { name: 'diversas',src: './imagens/diversas.jpg', alt: 'Diversas',},
  { name: 'electron', src: './imagens/electron.svg', alt: 'Electron',},
  { name: 'dio', src: './imagens/dio.jpg', alt: 'Dio',},
  { name: 'git', src: './imagens/git.svg', alt: 'Github' },
  { name: 'python', src: './imagens/python.png', alt: 'Python' },
  { name: 'ember', src: './imagens/ember.svg', alt: 'Ember',},
  { name: 'ecma', src: './imagens/ecma.jpg', alt: 'Ecma' },
  { name: 'net', src: './imagens/net.svg', alt: '.Net' },
  { name: 'java',src: './imagens/java.png', alt: 'Java'},
  { name: 'php', src: './imagens/php.png', alt: 'Php' },
  { name: 'c', src: './imagens/c.png', alt: 'C++' },
  { name: 'django', src: './imagens/django.png', alt: 'Django' },
  { name: 'bootsrap', src: './imagens/bootsrap.png', alt: 'Bootstrap' },
  { name: 'flask', src: './imagens/flask.png', alt: 'Flask' },
  { name: 'muitas', src: './imagens/muitas.jpg', alt: 'Muitas' },
  { name: 'spring', src: './imagens/spring.svg', alt: 'Spring',},
  { name: 'varios', src: './imagens/varios.png', alt: 'Varios' },

]


let locked = false
let firstClick, secondClick
let hitCounter = 0
let attemptCount = 0
let rangeTime,timerlimitFlip,limitCard
let gameGrid
let timerLimit

const widthStyle = document.querySelector('.memory-game')

const currentTimer = new Timer('#timer')

const grid = document.querySelector('#section-game')
const timerStyle = document.querySelector('#timer')

let selectText = document.querySelector('#dificuldade')

let button = document.querySelector('.bt-iniciar')

function creatHtml(){

  button.disabled = true

  var game = cardsArray.slice(0, limitCard)
  gameGrid = game.concat(game).sort(() => 0.5 - Math.random());
 
  gameGrid.forEach(
    (item) => {
      const card = document.createElement('div')
      card.classList.add('memory-card')
      card.dataset.name=item.name

      const cardFront = document.createElement('img')
      cardFront.classList.add('front-face')
      cardFront.src = item.src
      cardFront.alt = item.alt

      const cardBack = document.createElement('img')
      cardBack.classList.add('back-face')
      cardBack.src = './imagens/js-badge.svg'
      cardBack.alt = 'js-badge'

      grid.appendChild(card) 
      card.appendChild(cardFront) 
      card.appendChild(cardBack)
    }
  )
  const cards = document.querySelectorAll('.memory-card')
  setTimeout(() => flipUnflipAllCards(cards), 1200)
}

function flipCard(){
  attemptCount++

  if(locked)return false
  this.classList.add('flip')
  if(!firstClick){
    firstClick = this
    firstClick.removeEventListener('click', flipCard)
    return false
  }
  secondClick = this
  checkMatch()
}

function unFlipCard(){
  locked = true
  setTimeout(() => {
    firstClick.classList.remove('flip')
    firstClick.addEventListener('click', flipCard)
    secondClick.classList.remove('flip')

    locked = false
    firstClick = null
    secondClick = null

  }, timerlimitFlip)
}

function flipUnflipAllCards(cards){
  cards.forEach(card => card.classList.add('flip'))
  setTimeout(() => {
    cards.forEach(card =>{ 
      card.classList.remove('flip')
      card.addEventListener('click', flipCard)
    })
    currentTimer.start()
  }, rangeTime)
  
}

function checkMatch(){
  let isMatch = firstClick.dataset.name === secondClick.dataset.name ? true : false
  isMatch ? removeClick() : unFlipCard()
}

function removeClick(){

  hitCounter++
  if(hitCounter == gameGrid.length/2){
    finalGame()
  }
  firstClick.removeEventListener('click', flipCard)
  secondClick.removeEventListener('click', flipCard)

  locked = false
  firstClick = null
  secondClick = null

}

function configure(){

  let value = selectText.options[selectText.selectedIndex].value;
  switch(value){
    case 'facil':
      rangeTime = 3000
      limitCard = 6
      timerlimitFlip = 800 
      timerLimit = 30
      widthStyle.style.width='540px'
      break

      case 'medio':
      rangeTime = 6000
      limitCard = 12
      timerlimitFlip = 1000
      timerLimit = 10
      widthStyle.style.width='940px'
      break

      case 'dificil':
      rangeTime = 7000
      limitCard = 15
      timerlimitFlip = 1300
      timerLimit = 20
      break

      case 'expert':
      rangeTime = 10000
      limitCard = 20
      timerlimitFlip= 1200
      timerLimit = 30
      break

    default:
  }
  creatHtml()
}

function reset(){

  currentTimer.stop()

  widthStyle.style.width = '1100px'

  timerStyle.style.color = 'white'
  timerStyle.innerText = '00:00'

  button.disabled = false

  let cleamHtml = document.querySelector('#section-game')
  cleamHtml.innerText = ""

  attemptCount = 0
  hitCounter = 0
  timerlimitFlip = 0
  firstClick,secondClick = null

}

function finalGame(){

  const attemps = attemptCount / 2

  document.getElementById('modal-final').classList.add("show-modal")

  const attempsElement = document.getElementById('attemps')

  const erros = document.getElementById('erros')
  const hits = document.getElementById('hits')
  const score = document.getElementById('score')

  attempsElement.innerHTML='Tentativas = ' + attemps
  hits.innerHTML = 'Acertos = ' + hitCounter
  erros.innerHTML = 'Erros = ' + (attemps - hitCounter)
  score.innerHTML = 'Pontuação = ' + (hitCounter /attemps * 1000)

  currentTimer.stop()

}

function closeModal(opc){
  if(opc == 1){
    document.getElementById('modal-final').classList.remove("show-modal")
  }
  if(opc == 2){
    document.getElementById('modal-game-over').classList.remove("show-modal")
  }
  
  reset()

}

function gameOver(){
  document.getElementById('modal-game-over').classList.add("show-modal")
  currentTimer.stop()
}

function checkTimerLimit(){
  if(currentTimer.time > (timerLimit/3)){timerStyle.style.color='yellow'}
  if(currentTimer.time > (timerLimit * 0.6)){timerStyle.style.color='red'}
  if(currentTimer.time >= timerLimit)gameOver()

}


function Timer(e){
  this.element = e
  this.time = 0
  this.control = null
  

  this.start = () => {
    this.control = setInterval(() => {
      this.time++
      const minutes = Math.trunc(this.time/60)
      const seconds = this.time % 60
      document.querySelector(this.element).innerHTML = 
      (minutes < 10 ? '0' : '') +minutes+
      ':'+
      (seconds < 10 ? '0' : '')+seconds
      checkTimerLimit()

    }, 1000)
  }

  this.stop = () => {
    clearInterval(this.control)
    this.control = null
    this.time = 0
  }
}