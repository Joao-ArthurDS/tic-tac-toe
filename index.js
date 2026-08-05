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
        
        player.score++;
        const win = player.score === 3 ? true : false;
        return console.log(player.name);
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

    return { newGame, winner, getBoard, updateBoard, setTurn, getTurn }
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
    ticTacToe.setTurn();
};

