import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'ng-socket-io';
import MESSAGES from './messages';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html'
})
export class AliasComponent implements OnInit, OnDestroy {

  timeRemained: any;
  turn: boolean;
  started = false;
  message = 'Ожидание соперников';
  dot = '.';
  waitingMessage = '';
  wordDescribe = '';
  inputData = '';
  description = '';
  guessedWords: any[];
  players: any[];
  descriptions = [];
  failes = 0;
  maxFailes = 5;
  opponent: any;
  myScore = 0;
  opponentScore = 0;
  left: any;
  right: any;

  me = {
    name: 'Курочкин Владислав',
    photo: 'https://pp.userapi.com/c639619/v639619504/2f574/nua37r6QCP4.jpg',
    score: 0
  }

  constructor(private socket: Socket) {}

  ngOnInit() {
    setInterval(() => {
      if (this.dot.length === 3) {
        this.dot = '.';
      } else {
        this.dot += '.';
      }

      this.waitingMessage = this.message + this.dot;
    }, 1000);

    this.socket.connect();

    this.socket.fromEvent(MESSAGES.START_GAME).subscribe((msg: any) => {
      
      this.socket.emit(MESSAGES.USER_INFO, this.me);

      this.started = true;
    });

    this.socket.on(MESSAGES.USER_INFO, (msg: any) => {
      this.opponent = msg;
      this.opponent.score = 0;
    });

    this
    this.socket.fromEvent(MESSAGES.NEW_DESCIPTION).subscribe((msg: any) => {
      this.descriptions.push({
        text: msg.description
      });
    });

    this.socket.fromEvent(MESSAGES.NEW_WORD).subscribe((msg: any) => {
      this.wordDescribe = msg.word;
    });

    this.socket.fromEvent(MESSAGES.GUESS_SUCCESS).subscribe((msg: any) => {
      this.descriptions.push({
        text: msg.description,
        class: '_pull-right _right'
      });

      if (!this.turn) {
        this.me.score++;

      } else {
        this.opponent.score++;
      }
    });

    this.socket.fromEvent(MESSAGES.GUESS_WRONG).subscribe((msg: any) => {
      if (!this.turn) {
        this.failes++;
      }

      this.descriptions.push({
        text: msg.description,
        class: '_pull-right _wrong'
      });
    });

    this.socket.fromEvent(MESSAGES.TIME_REMAINED).subscribe((msg: any) => {
      let seconds = String(60 - msg.counter);

      if (parseInt(seconds) < 10) {
        seconds = '0' + seconds;
      }

      this.timeRemained = `0:${seconds}`;
    });

    this.socket.fromEvent(MESSAGES.NEW_TURN).subscribe((msg: any) => {
      this.turn = Boolean(msg.turn);
      this.failes = 0;
      this.descriptions = [];
      this.left = msg.left;
      this.right = msg.right;
      
      if (!this.turn) {
        this.wordDescribe = '';
      }
    });
  }

  getLeftUser(): any {
    if (this.turn) {
      return this.me

    } else {
      return this.opponent;
    }
  }

  getRightUser(): any {
    if (!this.turn) {
      return this.me

    } else {
      return this.opponent;
    }
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  send(): void {
    if (this.turn) {
      this.socket.emit(MESSAGES.DESCRIBE, {
        description: this.inputData
      });

    } else {
      this.socket.emit(MESSAGES.GUESS, {
        word: this.inputData
      });
    }

    this.inputData = '';
  }
}
