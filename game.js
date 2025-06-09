
const dialogInput = document.querySelector("#formDialog");

document.addEventListener("DOMContentLoaded", () => {
    dialogInput.showModal();
});

const gameboard = (function() {       
    const signs = ['X', 'O'];
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        
    const getSigns = () => signs;
    const getBoard = () => board;  
    
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
    
    return { getSigns, setBoard, getBoard, changeBoard };
})();

function createPlayer() {
    let name = "";
    let score = 0;

    const getName = () => name;
    const setName = (newName) => name = newName;
    const getScore = () => score;
    const updateScore = () => score++;

    return { getName, setName, getScore, updateScore };
}

const gameController = (function() {
    
    let toggleUser = true;

    const scoreLabel1 = document.querySelector("#scoreLabel1");
    const scoreLabel2 = document.querySelector("#scoreLabel2");

    const notify1 = document.querySelector("#notify-1");
    const notify2 = document.querySelector("#notify-2");

    const btnStartGame = document.querySelector("#start-game");
    btnStartGame.addEventListener("click", showForm);

    const btnRefresh = document.querySelector("#refresh");
    btnRefresh.disabled = true;
    btnRefresh.addEventListener("click", refreshBoard);

    const player1Score = document.querySelector("#player1Score");
    const player2Score = document.querySelector("#player2Score");
    player1Score.disabled = true;
    player2Score.disabled = true;
    
    const myForm = document.querySelector("#my_form");
    const user1 = document.querySelector("#player1Input");
    const user2 = document.querySelector("#player2Input");
    const btnLaunch = document.querySelector("#submit");
    const btnCancel = document.querySelector("#cancel");

    btnCancel.addEventListener("click", (e) => {
        e.preventDefault();

        if (!myForm.checkValidity() || myForm.checkValidity()) {     
            dialogInput.close();
            btnStartGame.disabled = false;
            btnRefresh.disabled = true;
        }
    });

    const dialogOutput = document.querySelector("#notifications");    
    const notifyResult = document.querySelector("#notifyResult");
    const btnNewGame = document.querySelector("#notifyNewGame");
    // start a new game
    btnNewGame.addEventListener("click", (e) => {
        e.preventDefault();
        dialogOutput.close();
        showForm();
    });
    
    const btnContinue = document.querySelector("#notifyContinue");
    // continue with same users along with their wins
    btnContinue.addEventListener("click", (e) => {
        e.preventDefault();
        dialogOutput.close();
        startGame(true);
    });

    const btnNotifyCancel = document.querySelector("#notifyCancel");
    btnNotifyCancel.addEventListener("click", (e) => {
        e.preventDefault();
        btnStartGame.disabled = false;
        btnRefresh.disabled = true;
        dialogOutput.close();    
    });
  
    let player1 = createPlayer();
    let player2 = createPlayer();     

    dialogInput.addEventListener('submit', (event) => {    
        
        if (!myForm.checkValidity()) {
            event.preventDefault(); 
        }
        else {  
            // new game, need new players
            if (player1.getName() !== "") {
                player1 = createPlayer();
            }
            if (player2.getName() !== "") {
                player2 = createPlayer();
            }
            
            player1.setName(user1.value);
            player2.setName(user2.value);
            
            startGame(false);
            dialogInput.close();            
        }       
    });
    
    function showForm() {
        btnStartGame.disabled = true;
        user1.value = "";
        user2.value = "";        
        scoreLabel1.style.setProperty('--player1-name', "");
        scoreLabel2.style.setProperty('--player2-name', "");
        player1Score.value = "";
        player2Score.value = "";
        dialogInput.showModal();
    }

    function startGame(continued) {
        // game continued (true) with same players
        // next game starts with loser's move        
        if (!continued) {
            toggleUser = true;
        }
        
        btnStartGame.disabled = true; 
        btnRefresh.disabled = false;        
        gameboard.setBoard();        
        displayGameBoard();        
    }
    
    function refreshBoard() {
        btnStartGame.disabled = true; 
        user1.value = "";
        user2.value = "";
        notify1.textContent = "";
        notify2.textContent = "";
        gameboard.setBoard();
        displayGameBoard();  
    }
    
    function availableBoxes() {
        // The function browses the board and builds a list of all the free squares
        const open = gameboard.getBoard().flat().filter(item => (item !== 'X' && item !== 'O'));

        return open;
    }

    function displayGameBoard() {
        notify1.textContent = `Your turn ${toggleUser === true ? player1.getName() : player2.getName()}`;   

        // Set the CSS variable used by ::before to add player name to labels
        scoreLabel1.style.setProperty('--player1-name', `"${player1.getName()}"`);
        scoreLabel2.style.setProperty('--player2-name', `"${player2.getName()}"`);

        const main = document.querySelector("#main");

        if (main.hasChildNodes()) {
            while (main.firstChild) {
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
        
        for (i = 0; i < squares.length; i++) {
                squares[i].className = "square";                
                squares[i].id = `square${i}`;
        }        
                
        gameboard.getBoard().flat().forEach((item, index) => {        
            const button = document.createElement("button");
            button.id = `${index + 1}`;
            button.className = "fill-button";
            if (item === 'X' || item === 'O') {
                button.textContent = item;
                if (item === 'X') {
                    button.classList.add("player1");
                }
                else {
                    button.classList.add("player2");
                }
            }
                        
            button.addEventListener("click", () => {                
                enterMove(index+1);
                checkForWinner();
            });
            
            squares[index].appendChild(button);
        });      

        squares.forEach(square => main.appendChild(square));
    }    


    function freezeBoard() {
        const mainDivButtons = document.querySelectorAll("#main > div > button");
        mainDivButtons.forEach(button => button.disabled = true);
    }

    function enterMove(position) { 
        notify2.textContent = "";
        let move = "";

        const sign = (toggleUser === true) ? 'X' : 'O';
        
        next_move = true;
        while (next_move) {            
            move = position;            
            
            if (move < 1 || move > 9 || isNaN(move)) {                
                notify2.textContent = "Invalid move. Try again."
            }
            else {   
                const emptySquare = gameboard.getBoard().flat().indexOf(move);

                if (emptySquare !== -1) {    
                    gameboard.changeBoard(move, sign);                    
                    next_move = false;
                    toggleUser = !toggleUser;     
                }
                
                if (next_move) {                    
                    notify2.textContent = "Space already taken. Try again.";
                    break;
                }        
            }        
        }
        displayGameBoard();        
    }   

    function checkForWinner() {
                
        const signs = [...gameboard.getSigns()];
        let winningSign = "";

        let result = "";        

        for (sign of signs) {
            const open = availableBoxes();
            
            if ((gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[0][2] === sign) ||                                
                (gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[1][2] === sign) ||                
                (gameboard.getBoard()[2][0] === sign && gameboard.getBoard()[2][1] === sign && gameboard.getBoard()[2][2] === sign) ||
                (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][0] === sign && gameboard.getBoard()[2][0] === sign) ||
                (gameboard.getBoard()[0][1] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][1] === sign) ||
                (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][2] === sign && gameboard.getBoard()[2][2] === sign) ||                
                (gameboard.getBoard()[0][0] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][2] === sign) ||
                (gameboard.getBoard()[0][2] === sign && gameboard.getBoard()[1][1] === sign && gameboard.getBoard()[2][0] === sign)) {               
                
                result = `${sign === 'X' ? player1.getName() : player2.getName()} won!`;
                if (sign === 'X') {
                    winningSign = 'X';
                }
                else if (sign === 'O') {
                    winningSign = 'O';
                }
            }
            else if (open.length === 0) {
                
                result = `Game ends in a tie`; 
            }
        }       
        if (result !== "") {                        
            notify1.textContent = "";
            notify2.textContent = "";
            freezeBoard();
            notifyResult.textContent = result;
            dialogOutput.showModal();           

            if (winningSign === 'X') {
                player1.updateScore();
                player1Score.value = player1.getScore(); 
                player2Score.value = player2.getScore();
               
            }
            else if (winningSign === 'O') {
                player2.updateScore();                
                player2Score.value = player2.getScore();
                player1Score.value = player1.getScore(); 
            }
            else {             
                player2Score.value = player2.getScore();
                player1Score.value = player1.getScore(); 
            }
            return true;
        }        
    }
       
    // no need to return anything, it's the controller, it takes from gameboard & created players
    return { }
    
})();
