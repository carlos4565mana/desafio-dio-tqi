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
let matchs = 0
let rangeTime,limitCard
let gameGrid
let timerLimit,faseGame 

const widthStyle = document.querySelector('.memory-game')
const grid = document.querySelector('#section-game')
const displayTimer = document.querySelector('#timer')
let button = document.querySelector('.bt')

const currentTimer = new Timer('#timer')

const start = () => {
  button.disabled = true
  faseGame = 1
  faseConfig()
}

function createCards(){

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

function checkMatch(){
  let isMatch = firstClick.dataset.name === secondClick.dataset.name ? true : false
  isMatch ? removeClick() : unFlipCard()
}


function removeClick(){

  matchs++

  firstClick.removeEventListener('click', flipCard)
  secondClick.removeEventListener('click', flipCard)

  if(matchs == (gameGrid.length/2)){
    faseGame++
   
   faseGame > 6 ?  createModal('end') :  createModal('nextfase')
  }

  locked = false
  firstClick = null
  secondClick = null

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

  }, 800)
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

function faseConfig(){

  switch(faseGame){
    case 1:
        rangeTime = 3000
        limitCard = 4
        timerLimit = 20
        widthStyle.style.width='540px'
        break

      case 2:
        rangeTime = 6000
        limitCard = 6
        timerLimit = 25
        widthStyle.style.width='540px'
        break

      case 3:
        rangeTime = 7000
        limitCard = 8
        timerLimit = 35
        widthStyle.style.width='540px'
        break

      case 4:
        rangeTime = 8000
        limitCard = 10
        timerLimit = 50
        widthStyle.style.width='630px'
        break

      case 5:
        rangeTime = 9000
        limitCard = 16
        timerLimit = 100
        widthStyle.style.width='940px'
        break

      case 6:
        rangeTime = 10000
        limitCard = 20
        timerLimit = 120
        widthStyle.style.width='1100px'
        break

  }

  cleamCardBoard()

  setTimeout(() => {

    createCards()
  }, 1000)
  
}

const cleamCardBoard = () => {

  currentTimer.stop()

  displayTimer.style.color='white'
  displayTimer.innerHTML='00:00'

  const modal = document.getElementById('modal')
  modal.classList.remove('show-modal')
  modal.innerHTML = ''
  let cleamHTML = document.getElementById("section-game");
  cleamHTML.innerText = "";

  matchs = 0;

}


const createModal = (option) => {

  currentTimer.stop()

  const modal = document.getElementById('modal')
  modal.classList.add('show-modal')
  const div = document.createElement('div')
  div.classList.add('modal-content')
  if(option === 'end'){

    div.innerHTML= `
      <span class="close-button" onclick="reset()">
      &times;
      </span>
      <img src="imagens/star-trophy.png" class="modal__img">
      <p id="tentativas">Parabéns voce chegou até o final !!!</p>
      <button class="modal__button-link close-modal" onclick="reset()">Fechar</button>
    `
  }
  if(option === 'gameover'){
    
    div.style.background = 'red'
    div.innerHTML = `
      <span class="close-button" onclick="reset()">
      &times;
      </span>
      <h2>Game Over !!!</h2>
    `
  }
  if(option === 'nextfase'){
    div.innerHTML= `
      <span class="close-button" onclick="faseConfig()">
      &times;
      </span>
      <p id="tentativas">Parabens voce passou para fase ${faseGame} !!!</p>
      <button class="modal__button-link close-modal"  onclick="faseConfig()" >Continuar</button>
    `
  }

  modal.appendChild(div)
  
}


function reset(){
  
  cleamCardBoard()
  faseGame =1
  limitCard = 1
  button.disabled = false

}

function changdisplayTimer(){
  if(currentTimer.time > (timerLimit/3)){displayTimer.style.color='yellow'}
  if(currentTimer.time > (timerLimit * 0.6)){displayTimer.style.color='red'}
  if(currentTimer.time >= timerLimit)createModal('gameover')

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
      changdisplayTimer()

    }, 1000)
  }

  this.stop = () => {
    clearInterval(this.control)
    this.control = null
    this.time = 0
  }
}