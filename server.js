const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PLAYERS = [];
const MAX_PLAYERS_NUMBER = 2;
const GAMES = [];
const ONE_MINUTE_CNT = 60;
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
  NEW_DESCIPTION: 'new-description',
  USER_INFO: 'user-info'
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
  let words = [
    'Information', 
    'Computer', 
    'Technology', 
    'Internet', 
    'Monitor',
    'Laptop',
    'Code'];
  let currentTeam = 'first';

  const teams = {
    first: {
      players: players,
      turn: true,
      score: 0
    }
  };

  const playersWebInfo = [];

  start();

  const userNames = [];

  players.forEach((player, idx) => {
    player.on(MESSAGES.USER_INFO, (msg) => {
      
      userNames.push({
        name: msg.name,
        photo: msg.photo
      });

      sendOthers(MESSAGES.USER_INFO, {
        name: msg.name,
        photo: msg.photo
      });
    });
  });

  function sendOthers(event, data) {
    players.forEach((player, idx) => {
      for (var i = 0; i < players.length; i++) {
        if (idx !== i) {
          players[i].emit(event, data)
        }
      }
    });
  }

  function sendAll(event, data) {
    players.forEach(player => {
      player.emit(event, data || {});
    });
  }

  function start() {
    sendAll(MESSAGES.START_GAME);
    startTurn();
    nextWord();
  }

  players.forEach((player, idx) => {
    player.on(MESSAGES.DESCRIBE, (msg) => {
        players.forEach((other, otherIdx) => {
            other.emit(MESSAGES.NEW_DESCIPTION, {
              description: msg.description
            });
        });
    });
  });

  players.forEach(player => {
    player.on(MESSAGES.GUESS, (msg) => {
      
      console.log(msg.word, words[currentWord]);

      if (msg.word.toLowerCase() === words[currentWord].toLowerCase()) {
        successGuess(msg.word);
        nextWord();

      } else {
        players.forEach(player => {
          player.emit(MESSAGES.GUESS_WRONG, {
            description: msg.word
          });
        })
      }
    });
  });

  function successGuess(word) {
    
    players.forEach(player => {
      player.emit(MESSAGES.GUESS_SUCCESS, {
        description: word
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

        console.log('Emit new word');
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
      if (isPlayerTurn(idx)) {
        let left = idx === 0 ? players[0] : players[1];
        let right = idx === 0 ? players[1] : players[0];

        player.emit(MESSAGES.NEW_TURN, {
          turn: isPlayerTurn(idx),
          left: left,
          right: righ
        });

      } else {
        let left = idx === 0 ? players[1] : players[0];
        let right = idx === 0 ? players[0] : players[1];

        player.emit(MESSAGES.NEW_TURN, {
          turn: isPlayerTurn(idx),
          left: left,
          right: right
        });
      }
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
            start();
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
}

server.listen(5000, () => {
  console.log('Server started!');
});
