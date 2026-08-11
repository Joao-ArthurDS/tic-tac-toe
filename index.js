const ng_button = document.getElementById('ng_btn');
ng_button.addEventListener('click',startNewGame);

const game_cells = document.querySelectorAll('[data-id]');
game_cells.forEach((cell) => cell.addEventListener('click',selectCell));

const input_names = document.querySelectorAll('input');

const game_div = document.getElementById('game_div');
game_div.style.display = 'none';


const ticTacToe = (() => {
    let board;
    let turn;
    let player1;
    let player2;
    let validMove;

    const newGame = (p1,p2) => {
        const hasMSG = document.getElementById('winMsg');
        if(hasMSG){
            hasMSG.remove();
        };

        player1 = createPlayer(p1,1);
        player2 = createPlayer(p2,2);
        turn = player1;
        game_div.style.display = 'flex';
        newRound();
    };

    const newRound = ()=>{
        board = [[0,0,0],[0,0,0],[0,0,0]];
        game_cells.forEach((cell) => cell.innerHTML = '');
        return board;
    }

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
        
        if (win){
            player.add_score();
            const score_id = turn === player1 ? 'score_p1' : 'score_p2';
            document.getElementById(score_id).innerHTML = player.get_score();
            console.log(player.name);
        };

        //player.get_score = win ? player.score++ : player.score;
        const winGame = player.get_score() === 3 ? true : false;

        if(winGame){
            console.log(`${player.name} wins, click start a new game`);
            input_names.forEach((input) => input.readOnly = false);
            const winMessage = document.createElement('p');
            winMessage.setAttribute('id','winMsg');
            winMessage.innerHTML = `${player.name} wins, click New Game button to start a new game.`;
            document.querySelector('body').appendChild(winMessage);
            
            game_div.style.display = 'none';
            player1 = null;
            player2 = null;
            document.getElementById('score_p1').innerHTML = '0';
            document.getElementById('score_p2').innerHTML = '0';
        }else{ 
            if(win){ newRound() };
        };
    };

    const getBoard = () => {
        return board;
    }

    const updateBoard = (player,x,y) => {
        if(board[x][y] === 0){
            board[x][y] = player.marker;
            validMove = true;
            const marker_design = player.marker === 1 ? 'x' : 'o';
            document.querySelector(`[data-id="${x}${y}"]`).innerHTML = marker_design;
        }else{
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

    return { newGame, newRound, checkWin, getBoard, updateBoard, setTurn, getTurn }
})();

function createPlayer(name, marker){
    let score = 0;
    const get_score = () => score;
    const add_score = () => { score++; };
    const reset_score = () => { score = 0; };
    return { name, marker, score, get_score,  add_score, reset_score };
};

function startGame(player1name, player2name){
    ticTacToe.newGame(player1name,player2name);
    input_names.forEach((input) => input.readOnly = true);
};

function makePlay(position){
    const player = ticTacToe.getTurn();
    ticTacToe.updateBoard(player,position[0],position[1]);
    ticTacToe.checkWin(player);
    ticTacToe.setTurn();
};

function selectCell(e){
    const selected_cell = e.currentTarget.dataset.id;
    makePlay(selected_cell.split(''));

};

function startNewGame(e){
    const p1Name = document.getElementById('player1_name');
    const p2Name = document.getElementById('player2_name');
    startGame(p1Name.value,p2Name.value);
};