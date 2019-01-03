/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


1.A player looses entire score when rolls two six in a row
2.Input field in html to set winning score  (.value)
3.Add another dice. The player looses current score when only one of them has 1 on it

*/

var scores, roundScore, activePlayer,winningPoints,gamePlaying, prev1,prev2,input;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){
        //1.Random number
        var dice1 = Math.floor(Math.random() * 6 )+ 1;
        var dice2 = Math.floor(Math.random() * 6 )+ 1;


        //2.Display the result
        var dice1DOM = document.querySelector('#first');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        var dice2DOM = document.querySelector('#second');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        //3.Update score
        if((dice1 === 6 || dice2 === 6) && (prev1 === 6 || prev2 ===6)){
            scores[activePlayer] = 0;
            //Update the UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            gamePlaying = false;
            setTimeout(nextPlayer, 2000);
        }else if(dice1 !== 1 && dice2 !== 1){
            //Add score
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            prev1 = dice1;
            prev2 = dice2;
        } else{
            //Next player
            gamePlaying = false;
            setTimeout(nextPlayer, 1000);
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        //Add global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check id player won the game

        if (scores[activePlayer] >= winningPoints) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#first').style.display = 'none';
            document.querySelector('#second').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prev1 = 0;
    prev2 = 0;
    gamePlaying = true;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#first').style.display = 'none';
    document.querySelector('#second').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    prev1 = 0;
    prev2 = 0;
    gamePlaying = true;
    input = document.getElementById('win-score').value;

    input ? winningPoints = input : winningPoints = 100;

    document.querySelector('#first').style.display = 'none';
    document.querySelector('#second').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1!';
    document.querySelector('#name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-1').textContent; <- pobieranie z html