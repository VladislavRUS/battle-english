const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PLAYERS = [];
const MAX_PLAYERS_NUMBER = 2;
const GAMES = [];
const ONE_MINUTE_CNT = 6000;
const MESSAGES = {
  START_GAME: 'start-game',
  END_GAME: 'end-game',
  TIME_REMAINED: 'time-remained',
  GUESS: 'guess',
  GUESS_WRONG: 'guess-wrong',
  GUESS_SUCCESS: 'guess-success',
  NEW_WORD: 'new-word',
  NEW_TURN: 'new-turn',
  DESCRIBE: 'describe',
  NEW_DESCIPTION: 'new-description'
}
const MAX_WORDS_GUESSED = 10;

io.on('connection', (socket) => {
  PLAYERS.push(socket);
  console.log('Added player...');

  if (PLAYERS.length === MAX_PLAYERS_NUMBER) {
    const players = PLAYERS.splice(0, MAX_PLAYERS_NUMBER);
    const game = new Game(players, GAMES.length);
    console.log('Game started...')
  }

  socket.on('disconnect', () => {
    PLAYERS.splice(PLAYERS.indexOf(socket), 1);
    console.log('Removed player...');
  });
});

function Game(players, idx) {

  let turn = 0;
  let wordsGuessed = 0;
  let currentWord = 0;
  let words = ['a', 'b', 'c', 'd', 'e'];
  let currentTeam = 'first';

  const teams = {
    first: {
      players: players,
      turn: true,
      score: 0
    }
  };

  players.forEach(player => {
    player.emit(MESSAGES.START_GAME, {
      team: 'first'
    });

    startTurn();
    nextWord();
  });

  players.forEach((player, idx) => {
    player.on(MESSAGES.DESCRIBE, (msg) => {
      if (isPlayerTurn(idx)) {
        players.forEach((other, otherIdx) => {
          if (idx !== otherIdx) {
            other.emit(MESSAGES.NEW_DESCIPTION, {
              description: msg.description
            });
          }
        });
      }
    });
  })
  players.forEach(player => {
    player.on(MESSAGES.GUESS, (msg) => {
      if (msg.word === words[currentWord]) {
        teams.msg['team'].score++;
        successGuess(msg.word);
        nextWord();

      } else {
        players.forEach(player => {
          player.emit(MESSAGES.GUESS_WRONG);
        })
      }
    });
  });

  function successGuess(word) {
    players.forEach(player => {
      player.emit(MESSAGES.GUESS_SUCCESS, {
        word: word
      });
    });
  }

  function nextWord() {
    currentWord++;

    players.forEach((player, idx) => {
      if (isPlayerTurn(idx)) {
        player.emit(MESSAGES.NEW_WORD, {
          word: words[currentWord]
        });
      }
    });
  }

  function isPlayerTurn(idx) {
    return teams[currentTeam].turn === idx
  }

  function startTurn() {
    console.log('Turn started...');
    let gameInterval = null;
    teams[currentTeam].turn = teams[currentTeam].turn === 0 ? 1 : 0;

    players.forEach((player, idx) => {
      player.emit(MESSAGES.NEW_TURN, {
        turn: isPlayerTurn(idx)
      });
    });

    startInterval();

    function startInterval() {
      let cnt = 0;

      gameInterval = setInterval(() => {
        cnt++;

        if (cnt === ONE_MINUTE_CNT) {
          turn++;

          clearInterval(gameInterval);
          if (wordsGuessed === MAX_WORDS_GUESSED) {
            endGame();

          } else {
            startTurn();
          }
        }

        players.forEach(player => {
          player.emit(MESSAGES.TIME_REMAINED, {
            counter: cnt
          });
        });

      }, 1000);
    };
  }

  const endGame = () => {
    players.forEach(player => {
      player.emit(MESSAGES.END_GAME);
    });

    GAMES.splice(idx, 1);
    clearInterval(gameInterval);
  }

  startTurn();
}

server.listen(5000, () => {
  console.log('Server started!');
});
