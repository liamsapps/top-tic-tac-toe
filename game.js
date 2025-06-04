/* Needed to use prompt in terminal (testing without opening in browser)
   cd ~/wip
   npm install prompt-sync
*/
const prompt = require('prompt-sync')();

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
const gameboard = (function() {       
    let signs = ['X', 'O'];
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    const getSigns = () => signs;
    const getBoard = () => board;

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


    function displayBoard() {
        console.log("+-------+-------+-------+");
    
        for (row of board) {
            console.log("|       |       |       |");
            console.log("|       |       |       |");
            const newRow = row.join("");
            console.log(newRow.replace(/^(.)(.)(.)$/, '|   $1   |   $2   |   $3   |'));            
            console.log("|       |       |       |");
            console.log("|       |       |       |");
            console.log("+-------+-------+-------+");
        }
    }

    return { getSigns, getBoard, changeBoard, displayBoard };
})();

function createPlayer(name) {
    // let moves = [];
    // function enterMove() {

    // }    
    // return { name, moves, enterMove };
    return { name };

}

function gameController() {
    function startGame() {
        console.log("Start the game!");
        gameboard.displayBoard();
    }

    function availableBoxes() {
        // The function browses the board and builds a list of all the free squares
        const open = gameboard.getBoard().flat().filter(item => item !== "X" && item !== "O");
       
        return open;
    }
    
    function enterMove(player, sign) {        
        next_move = true;
        while (next_move) {
            move = parseInt(prompt(`Your turn ${player.name}: `));            
            
            if (move < 1 || move > 9 || isNaN(move)) {
                console.log("Invalid move. Try again.");
            }
            else {   
                const emptySquare = gameboard.getBoard().flat().indexOf(move);
                if (emptySquare !== -1) {    
                    gameboard.changeBoard(move, sign);
                    console.log(gameboard.getBoard());
                    next_move = false;
                }
                
                if (next_move) {
                    console.log("Space already taken. Try again.");                    
                }        
            }
        }
        gameboard.displayBoard();
    }

    function checkForWinner() {
                
        const signs = [...gameboard.getSigns()];
                
        for (sign of signs) {
            const open = availableBoxes();
            
            if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[0][2] === sign) {                                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[1][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[2][0] === sign && gameboard.getBoard()[2][1] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[2][0] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][1] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][2] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][2] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][0] === sign) {                
                console.log(`${sign === 'X' ? player1.name : player2.name} won!`);
                return true;
            }
            else if (open.length === 0) {
                console.log('Game ends in a tie.')
                return true;
            }
        }       
    }
    return { startGame, availableBoxes, enterMove, checkForWinner };
}

const game = gameController();
const player1 = createPlayer("Liam");
const player2 = createPlayer("Fred");

game.startGame();

while (true) {
    game.enterMove(player1, 'X');
    
    if (game.checkForWinner()) {
        break;
    }

    game.enterMove(player2, 'O');
    
    if (game.checkForWinner()) {
        break;
    }
}
