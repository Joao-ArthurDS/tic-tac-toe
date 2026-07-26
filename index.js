const ticTacToe = (() => {
    let board;

    const newGame = () => {
        board = [[0,0,0],[0,0,0],[0,0,0]];
        return board;
    };

    const winner = (player) => {
        return console.log(player.name);
    };

    const getBoard = () => {
        return board;
    }

    const updateBoard = (player,x,y) => {
        board[x][y] = player.marker;
        return board;
    }

})();

function createPlayer(name, marker){
    return { name, marker };
};