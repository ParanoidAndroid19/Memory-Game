
document.addEventListener('DOMContentLoaded', () => {

  //card options
  //Basically array of all images, where each image is an object which has name and img properties.
  //Thus array of objects
  //And for each image we are creating 2 objects, cause for the memory game each image is displayed twice onscreen
  //also const means the declared thing cannot be altered later
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
  ]

  //To shuffle the cardArray
  cardArray.sort(() => 0.5 - Math.random())

  //get element with the class name as grid
  const grid = document.querySelector('.grid')

  //get the element with id=result, that ele which got the span tag
  const resultDisplay = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenId = []
  var cardsWon = []

  // My own changes:
  // To avoid flipping the cards which have already been matched correctly, I can check the src of the card
  // if the src === white.png then don't flip the card.

  //create the board

  function createBoard() {
    //looping over the card array, for each card creating an image element
    for (let i=0; i < cardArray.length; i++){
      //creating an img element using 'img' HTML tag
      //eg of img element: <img src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back.">
      var card = document.createElement('img')

      // card being an img element has the attribute src which is link of the image
      // So here creating cards which displays that weird pattern image.
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i) //assigning all the img elements an index from the cardArray

      //adding an addEventListener to all the cards
      card.addEventListener('click', flipCard)

      //All these cards (img elements) are added to the div with class name grid, which displays using flex
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch(){
    // get all the images created in the function createBoard, that is cardArray.length number of blank img elements
    var cards = document.querySelectorAll('img')

    //now we have two values in cardsChosen and cardsChosenId arrays, that is both the clicked img elements
    //storing the index of both the chosen images
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    //cardsChosen array has the names of the images chosen, eg fries
    //checking if the names of the chosen images match
    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match!")

      // since cards constains all the img elements.
      // the cards which are correctly matched are made white
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')

      //both the matched cards are pushed to cardsWon array
      cardsWon.push(cardsChosen)
    }

    // if the cards don't match
    else {
      //flip them back to blank image again
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert("Sorry, try again!")
    }

    //either way clear the cardsChosen and cardsChosenId arrays
    cardsChosen = []
    cardsChosenId = []

    //display the user score = the amount of cards won using the cardsWon array
    resultDisplay.textContent = cardsWon.length

    if (cardsWon.length === cardArray.length/2){
      resultDisplay.textContent = "Congratulations! You found them all"
    }
  }

  // flip image
  function flipCard() {
    //this refers to the card which is clicked which calls the function flipCard

    // This is to avoid flipping the already matched cards
    var white = this.getAttribute('src')
    if (white === 'images/white.png'){
      alert('Pls click the colored boxes.')
      return
    }

    //cardId is an index of the cardArray which is assigned to all the blank img elements
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name) //to record the names of all the cards clicked on
    cardsChosenId.push(cardId)

    //this where the actual flip happens, the card's src i.e image is changed from blank to array img according to cardId
    this.setAttribute('src', cardArray[cardId].img)

    // we only want to put two cards in our cardsChosen array
    if (cardsChosen.length === 2) {
      //The result (if the images match or not) is calculated after 500milsec to avoid going too fast
      setTimeout(checkForMatch, 500)
    }
  }


  createBoard()

})
