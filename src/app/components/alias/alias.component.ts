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

  constructor(private socket: Socket) {
    this.turn = true;
  }

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

    this.socket.fromEvent(MESSAGES.START_GAME).subscribe(() => {
      this.started = true;
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

      console.log(this.turn);
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
