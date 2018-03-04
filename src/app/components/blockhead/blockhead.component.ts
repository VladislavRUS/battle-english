import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-blockhead',
  templateUrl: './blockhead.component.html'
})
export class BlockheadComponent implements OnInit {

  @ViewChild('gameField')
  gameField: ElementRef;

  private size = 5;

  constructor() { }

  ngOnInit() {
    this.initGameField();
  }

  initGameField(): void {
    const table = document.createElement('table');
    const arr = [['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;'],
    ['&nbsp;', '&nbsp;', '&nbsp;', 'N', '&nbsp;'],
    ['B', 'R', 'A', 'I', 'N'],
    ['&nbsp;', '&nbsp;', 'C', 'W', '&nbsp;'],
    ['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;']];

    for (let i = 0; i < this.size; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < this.size; j++) {
        const td = document.createElement('td');
        const div = document.createElement('div');

        div.innerHTML = arr[i][j];

        if (!(arr[i][j] === '&nbsp;')) {
          div.classList.add('_busy');
        }

        td.appendChild(div);
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }

    this.gameField.nativeElement.appendChild(table);
  }

}
