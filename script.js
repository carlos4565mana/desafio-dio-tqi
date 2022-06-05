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

const grid = document.querySelector('#section-game')

function start(){

  const createHtml = cardsArray.forEach(
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

}