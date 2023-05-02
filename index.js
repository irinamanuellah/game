const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X';const playerTwo = 'O';
let playerTurn = playerOne;

//les combinaisons de victoires
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell =>{
    cell.addEventListener('click', playGame,{once:true});
});

function playGame(e){
    e.target.innerHTML = playerTurn;

    if(checkWin(playerTurn)){
        updateStatus("wins" + playerTurn);
        return endGame();
    }else if(checkDraw()){
        updateStatus("draw");
        return endGame();
    }

    updateStatus(playerTurn);
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

function checkWin(playerTurn){
    return winningPatterns.some(combinaison => {
        return combinaison.every(index =>{
            return cells[index].innerHTML == playerTurn;
        });
    });
}

//tester chaque combinaison de victoire
function checkDraw(){
    return [...cells].every(cell =>{
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo
    });
}

//voir le tour des joueur
function updateStatus(status){
    let statusText;

    switch (status){
        case 'X':
            statusText = "Au tour du joueur 2 (O)";
            break;
        case 'O':
            statusText = "Au tour du joueur 1 (X)";
            break;
        case 'winsX':
            statusText = "Le joueur 1 (X) a gagner!";
            break; 
        case 'winsO':
            statusText = "Le joueur 2 (O) a gagner!";
            break; 
        case 'draw':
            statusText = "Egalite! Personne ne gagne!";
            break;
}

gameStatus.innerHTML = statusText;
endGameStatus.innerHTML = statusText;
}

//mettre fin au jeux
function endGame(){
    document.getElementById('gameEnd').style.display = "block"
}

//recommencer le jeu
function reloadGame(){
    window.location.reload()
}