/* Needed to use prompt in terminal (testing without opening in browser)
   cd ~/wip
   npm install prompt-sync
*/
// const prompt = require('prompt-sync')();

/* Pseudocode */
/*  1.create gameboard object
        createBoard
        displayBoard
    2.create player object
        moves[]
        enterMove()
    3.create game object
        startGame()
        checkWinner()
        endGame()
*/
let toggleUser = true;

const gameboard = (function() {       
    const signs = ['X', 'O'];
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        
    const getSigns = () => signs;
    const getBoard = () => board;  
    
    const notify1 = document.querySelector("#notify-1");
    const notify2 = document.querySelector("#notify-2");

    const setBoard = () => board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    const changeBoard = (toChange, newValue) => {
        board = board.map((row) => {
        const foundIndex = row.findIndex((item) => item === toChange);
        if (foundIndex !== -1) {
            const newRow = [...row];            
            newRow[foundIndex] = newValue;
            return newRow;
        }
        return row;
        });
    };

    function displayGameBoard() {
        console.log("in buildGameBoard");
        // notify1.textContent = `Your turn ${gameController.toggleUser === true ? gameController.player1.name : gameController.player2.name}`;   
        notify1.textContent = `Your turn ${toggleUser === true ? gameController.player1.name : gameController.player2.name}`;   

        const main = document.querySelector("#main");

        if (main.hasChildNodes()) {
            console.log("has children");
            while (main.firstChild) {
                console.log("removing children");
                main.removeChild(main.firstChild);
            }
        }
                
        const square1 = document.createElement("div");
        const square2 = document.createElement("div");
        const square3 = document.createElement("div");
        const square4 = document.createElement("div");
        const square5 = document.createElement("div");
        const square6 = document.createElement("div");
        const square7 = document.createElement("div");
        const square8 = document.createElement("div");
        const square9 = document.createElement("div");
        const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
        // const squares = document.querySelectorAll("#main > div");
           
        // squares.forEach(item => console.log(`typeof square: ${typeof square}`));
        // const initialBoard = board;
        // console.log(`initialBoard ${initialBoard}`);

        for (i = 0; i < squares.length; i++) {
                squares[i].className = "square";
                // squares[i].textContent = `${i+1}`;
                squares[i].id = `square${i}`;
        }        
        
        board.flat().forEach((item, index) => {
            console.log(`board item: ${item} at index: ${index}`);
            const button = document.createElement("button");
            button.id = `${index + 1}`;
            button.className = "fill-button";
            button.textContent = item;
            
            button.addEventListener("click", () => {
                console.log(`index: ${index}`);
                console.log(`index + 1: ${index + 1}`);
                gameController.enterMove(index+1);
                gameController.checkForWinner();
            });
            
            squares[index].appendChild(button);
        });      

        squares.forEach(square => main.appendChild(square));
    }    

    // return { getSigns, getBoard, changeBoard, displayBoard, displayGameBoard };
    // return { getSigns, getBoard, changeBoard, displayGameBoard, getLastClickedButtonId, setLastButtonID };
    return { getSigns, setBoard, getBoard, changeBoard, displayGameBoard, notify1, notify2 };
})();

function createPlayer(name) {
    // let active = true;
    // let moves = [];
    // function enterMove() {

    // }    
    // return { name, moves, enterMove };
    // return { name, active };
    return { name };
}

const gameController = (function() {
    const btnStartGame = document.querySelector("#start-game");
    btnStartGame.addEventListener("click", startGame);

    const btnRestart = document.querySelector("#restart");
    btnRestart.addEventListener("click", restart);

    // let toggleUser = true;
    const player1 = createPlayer("Liam");
    const player2 = createPlayer("Fred");
    
    console.log(`player1.active ${player1.active}`);
    console.log(`player2.active ${player2.active}`);
    
    function startGame() {
        btnStartGame.disabled = true; 
        console.log("Start the game!");    
        gameboard.displayGameBoard();  
        // notify1.textContent = `Your turn ${toggleUser === true ? player1.name : player2.name}`;                 
    }

    function restart() {
        toggleUser = true;
        btnStartGame.disabled = true; 
        gameboard.setBoard();
        gameboard.displayGameBoard();  

    }
    // function playGame() {    
    //     // console.log(`lastClicked: ${gameboard.getLastClickedButtonId()}`);      
    //     // const player1 = createPlayer("Liam");
    //     // const player2 = createPlayer("Fred");
    //     while (true) {
    //         gameController.enterMove(player1, 'X');  
    //         console.log("player1 moved");
    //         gameboard.setLastButtonID();

    //         if (gameController.checkForWinner()) {
    //             break;
    //         }

    //         gameController.enterMove(player2, 'O');   
    //         console.log("player2 moved");
    //         gameboard.setLastButtonID();

    //         if (gameController.checkForWinner()) {
    //             break;
                
    //         }
    //     }

    // }

    function availableBoxes() {
        // The function browses the board and builds a list of all the free squares
        const open = gameboard.getBoard().flat().filter(item => (item !== 'X' && item !== 'O'));

        return open;
    }

    // function enterMove(player, sign) {  
    // function enterMove(sign) {
    function enterMove(position) { 
        gameboard.notify2.textContent = "";
        let move = "";
        // const notify1 = document.querySelector("#notify-1");
        // const notify2 = document.querySelector("#notify-2");
        // notify.textContent = `Your turn ${player.name}`;  
        // notify.textContent = `Your turn ${sign === 'X' ? gameController.player1.name : gameController.player2.name}`;  
        // notify.textContent = `Your turn ${gameController.player1.active === true ? gameController.player1.name : gameController.player2.name}`;  
        // notify1.textContent = `Your turn ${player1.active === true ? player1.name : player2.name}`;  
        // notify1.textContent = `Your turn ${player1.name === "Liam" ? player1.name : player2.name}`;  
        // notify1.textContent = `Your turn ${toggleUser === true ? player1.name : player2.name}`;  
        // notify1.textContent = `Your turn ${gameController.toggleUser === true ? gameController.player1.name : gameController.player2.name}`;
        // const sign = player1.active === true ? 'X' : 'O';
        const sign = toggleUser === true ? 'X' : 'O';
        console.log(`move ${move}`);    

        next_move = true;
        while (next_move) {
            // move = parseInt(prompt(`Your turn ${player.name}: `));            
            // do {
            // move = parseInt(gameboard.getLastClickedButtonId());
            move = position;
            // } while (gameboard.getLastClickedButtonId() === "")

            console.log(`move ${move}`);    
            
            if (move < 1 || move > 9 || isNaN(move)) {
                console.log("Invalid move. Try again.");
                gameboard.notify2.textContent = "Invalid move. Try again."

            }
            else {   
                const emptySquare = gameboard.getBoard().flat().indexOf(move);

                if (emptySquare !== -1) {    
                    gameboard.changeBoard(move, sign);
                    console.log(gameboard.getBoard());
                    next_move = false;
                    toggleUser = !toggleUser;
                    // if (player1.active === true) {
                    //     player1.active = false;
                    // } 
                    // else if (player2.active === true) {
                    //     player2.active = false;
                    // }  
                    // else if (player1.active === false) {
                    //     player1.active = true;
                    // }                     
                    // else if (player2.active === false) {
                    //     player2.active = true;
                    // }

                }
                
                if (next_move) {
                    console.log("Space already taken. Try again.");                    
                    gameboard.notify2.textContent = "Space already taken. Try again.";
                    break;
                }        
            }        
        }
        gameboard.displayGameBoard();
        // gameboard.displayBoard();
    }   

    function checkForWinner() {
                
        const signs = [...gameboard.getSigns()];

        for (sign of signs) {
            const open = availableBoxes();
            
            if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[0][2] === sign) {                                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[1][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[2][0] === sign && gameboard.getBoard()[2][1] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[2][0] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][1] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][2] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][0] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                gameboard.notify1.textContent = `${sign === 'X' ? player1.name : player2.name} won!`; 
                return true;
            }
            else if (open.length === 0) {
                console.log('Game ends in a tie.')
                gameboard.notify1.textContent = `Game ends in a tie`; 
                return true;
            }
        }       
    }
    // return { startGame, playGame, availableBoxes, enterMove, checkForWinner };
    // return { startGame, availableBoxes, enterMove, checkForWinner, toggleUser, player1, player2 };
    return { startGame, availableBoxes, enterMove, checkForWinner, player1, player2 };
})();


// const player1 = createPlayer("Liam");
// const player2 = createPlayer("Fred");

// gameController.startGame();

// while (true) {

//     gameController.enterMove(player1, 'X');  

//     if (gameController.checkForWinner()) {
//         break;
//     }

//     gameController.enterMove(player2, 'O');   

//     if (gameController.checkForWinner()) {
//         break;
//     }
// }
