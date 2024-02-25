//Define HTML elements 

class snakeGame {
    constructor() {
        const thisElement = this;
        //Grabing grid 
        thisElement.board = document.getElementById('game-board');
        //Instruction text
        thisElement.instructionText = document.getElementById('instruction-text');
        //Logo 
        thisElement.logo = document.getElementById('logo');
       
        /* Define game variables*/
        // Starting position of a snake
        thisElement.snake = [{x: 10, y: 10}]; 
        //Grid size
        thisElement.gridSize = 20;
        //Request to generate food
        thisElement.food = thisElement.generateFood(); //& sending callback request ->🟣
        //Starting snake postion
        thisElement.direction = 'right';

        thisElement.gameInterval;
        //Game speed
        thisElement.gameSpeedDelay = 350;
        console.log(thisElement.gameSpeedDelay)
        //game on / off
        thisElement.gameStarted = false;

        //~ Listens for keypreses and sends the data to the fuinction -> 
        document.addEventListener('keydown', document.addEventListener('keydown', (event) => thisElement.handleKeypress(event)));
        
    }

    // Drawing game map, snake + food
    draw() {
     const thisElement = this;
     thisElement.board.innerHTML = '';
     this.drawFood();
     this.drawSnake();
    }

    //Key press listener event


    
    startGame() {
        const thisElement = this;

        thisElement.gameStarted = true; // Keep track of a running game
        thisElement.instructionText.style.display = 'none';  //Removes the instruction text
        thisElement.logo.style.display = 'none';  //Removes the logo

        thisElement.gameInterval = setInterval(() => {
            thisElement.move();
            // thisElement.checkCollision();
            thisElement.draw();
        }, thisElement.gameSpeedDelay)
    }

    //Our event listener 🖱
    handleKeypress(event) {   //~ <- reciving infomration back from an event listner 
        const thisElement = this;
        //Pressing spacebar starts the game! 
        //double if was required to check spacebar is detected by all the browsers
        if((!thisElement.gameStarted && event.code === 'Space') || (!thisElement.gameStarted && event.key === '')) {
            thisElement.startGame(); 
        } else { 
            switch (event.key) { 
                case 'ArrowUp':
                thisElement.direction = 'up';
                break;
                case 'ArrowDown':
                thisElement.direction = 'down';
                break;
                case 'ArrowLeft':
                thisElement.direction = 'left';
                break; 
                case 'ArrowRight':
                thisElement.direction = 'right';
                break;
            }
        }
    }

    // [Draw Snake] 🐍 
    drawSnake() {
        const thisElement = this;
        thisElement.snake.forEach((segment) => {
            const snakeElement = thisElement.createGameElement('div', 'snake'); //* Callback creating snake 🔵
            //⬇
            //passsed from callback '<div class="snake"></div>', '{x: 10, y: 10}'
            this.setPosition(snakeElement, segment) 

            //Uploading the snake div to the grid board
            thisElement.board.appendChild(snakeElement);
        });
    }

    
    //Creating a HTML element 
    createGameElement(tag, className) {   //**-> returning callback snake🔵 
          //Creating a new HTML from function argument //?-> returning callback food🟢
        const element = document.createElement(tag);
        //Adding a class to the created element 
        element.className = className;
        // returning back our element throught callback. 
        return element;  
    }

    //Defining position of snake + food 🐍🍖
    setPosition(element, position) {
        element.style.gridColumn = position.x; //Horizontal x <->
        element.style.gridRow = position.y;    //Vertical y ↕
    }

    move() {
        const thisElement = this;
        //We had to use spread operator to make a 'copy' of the array and not just create a refrence.
        const head = {...thisElement.snake[0]}
        switch (thisElement.direction) {  //Our target 
            case 'right':   // if target = 'right', activate the code below etc..
            head.x++
                break;       

            case 'left': 
            head.x--
                break;    
            
            case 'up':  
            head.y--
            break;

            case 'down':
            head.y++
            break;
        }
        thisElement.snake.unshift(head); // -> Adds new coordiantes to the 'snake' object (at the begging)          

        // Check for snake and food colision
        // Check newly created 'head' coordinates & 'food' cooridnates
        if (head.x === thisElement.food.x && head.y === thisElement.food.y) {    
                thisElement.generateFood();  // if head + food collides generate food in new location
                
                /*Updating game speeing when head colides with food */
                thisElement.gameSpeedDelay -= 10;               // Update game speed
                clearInterval(thisElement.gameInterval);        // Clearing existing game loop interval in 'startGame' function
                thisElement.gameInterval = setInterval(() => {  //Starting new loop with updated game speed
                    thisElement.move();                        
                    thisElement.draw();
                }, thisElement.gameSpeedDelay);
        } else {
            this.snake.pop();  // Removes last coordiantes  from 'snake' object
        }

    }

    //[Draw food] 🍖
    drawFood() {
        const thisElement = this;
        const foodElement = thisElement.createGameElement('div', 'food'); //?-> Callback reating food 🟢
        this.setPosition(foodElement, thisElement.food);
        console.log(thisElement.food);
        thisElement.board.appendChild(foodElement);
    }

    //Food generation postion  🍖
    generateFood() {  //& -> retuning a callback function 🟣
        console.log('generating food')
        const thisElement = this;
        //generats random food postion
        let x = Math.floor(Math.random() * thisElement.gridSize) + 1;
        let y = Math.floor(Math.random() * thisElement.gridSize) + 1;
        thisElement.food = {x, y} 
        return {x, y}
    }
}

const newGame = new snakeGame();

