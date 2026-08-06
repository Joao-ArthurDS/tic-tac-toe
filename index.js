const ticTacToe = (() => {
    let board;
    let turn;
    let player1;
    let player2;
    let validMove;

    const newGame = (p1,p2) => {
        player1 = createPlayer(p1,1);
        player2 = createPlayer(p2,2);
        turn = player1;
        board = [[0,0,0],[0,0,0],[0,0,0]];
        return board;
    };

    const checkWin = (player) => {
        let win = false;
        const checkBoard = getBoard();
        for(let i = 0; i<=2; i++){
            if(checkBoard[i][0] === player.marker && 
                checkBoard[i][1] === player.marker && 
                checkBoard[i][2] === player.marker){//check if the row wins
                win = true;
                break;
            };

            if(checkBoard[0][i] === player.marker && 
                checkBoard[1][i] === player.marker && 
                checkBoard[2][i] === player.marker){ //check if column wins
                win = true;
                break;
            };           
        };
        
        if((checkBoard[0][0] === player.marker && 
            checkBoard[1][1] === player.marker && 
            checkBoard[2][2] === player.marker) ||
            (checkBoard[0][2] === player.marker && 
            checkBoard[1][1] === player.marker && 
            checkBoard[2][0] === player.marker)){ //check diagonals
            win = true;
        };

        player.score = win ? player.score++ : player.score;
        const winGame = player.score === 3 ? true : false;
        if (win){
        return console.log(player.name);}
    };

    const getBoard = () => {
        return board;
    }

    const updateBoard = (player,x,y) => {
        if(board[x][y] === 0){
            board[x][y] = player.marker;
            validMove = true;
        }else{
            board[x][y] = board[x][y];
            validMove = false;
        }
        return board;
    }

    const setTurn = () => {
        if(validMove) {
            if (turn === player1){
                return turn = player2;
            }else{
                return turn = player1;
            }
        }else{
            return turn;
        }
    }

    const getTurn = () => {
        return turn;
    }

    return { newGame, checkWin, getBoard, updateBoard, setTurn, getTurn }
})();

function createPlayer(name, marker){
    const score = 0;
    return { name, marker, score };
};

function startGame(player1name, player2name){
    ticTacToe.newGame(player1name,player2name);
};

function makePlay(position){
    const player = ticTacToe.getTurn();
    ticTacToe.updateBoard(player,position[0],position[1]);
    ticTacToe.checkWin(player);
    ticTacToe.setTurn();
};

