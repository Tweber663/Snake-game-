//Define HTML elements 


class snakeGame {
    constructor() {
        const thisElement = this;
        //Grabing grid 
        thisElement.board = document.getElementById('game-board');
       
        // Define game variables
        // Starting position of a snake
        thisElement.snake = [{x: 10, y: 10}];
        this.draw();
        
    }

    // Drawing game map, snake _ food
    draw() {
     const thisElement = this;
     thisElement.board.innerHTML = '';
     this.drawSnake();
    }

    // [Draw Snake] 🐍 - defining how snake looks
    drawSnake() {
        const thisElement = this;
        thisElement.snake.forEach((segment) => {
            const snakeElement = thisElement.createGameElement('div', 'snake'); //* Callback creating snake 🔵

            //This is what we're passing as argument '<div class="snake"></div>', '{x: 10, y: 10}'
            this.setPosition(snakeElement, segment) 
            thisElement.board.appendChild(snakeElement);
        });
    }
    
    //Creating an DIV element
    createGameElement(tag, className) {   //** -> returning callback 🔵
        //Creating a new HTML from function argument
        const element = document.createElement(tag);
        //Adding a class to the created element 
        element.className = className;
        // returning back our element throught callback. 
        return element;  
    }

    //Defining position of snake 🐍
    setPosition(element, position) {
        element.style.gridColumn = position.x; //Horizontal x <->
        element.style.gridRow = position.y;    //Vertical y ↕
        console.log(element, position.x);
    }

    //[Draw food]  
    drawFood() {
        const thisElement = this;
        const foodElement = thisElement.createGameElement('div', 'food');
        
    }



}


const newGame = new snakeGame();
