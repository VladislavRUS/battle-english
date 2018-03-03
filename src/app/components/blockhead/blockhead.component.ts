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

    for (let i = 0; i < this.size; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < this.size; j++) {
        const td = document.createElement('td');
        const div = document.createElement('div');
        
        if ((i + j) % 2 === 0) {
          div.innerHTML = String(i + j);
          div.classList.add('_busy');

        } else {
          div.innerHTML = '&nbsp;';
        }

        td.appendChild(div);
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }

    this.gameField.nativeElement.appendChild(table);
  }

}
