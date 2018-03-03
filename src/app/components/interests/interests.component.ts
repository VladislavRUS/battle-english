import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html'
})
export class InterestsComponent implements OnInit {

  interests = [
    {
      title: 'Политика'
    },
    {
      title: 'Музыка'
    },
    {
      title: 'Спорт'
    },
    {
      title: 'Бизнес'
    },
    {
      title: 'Религия'
    },
    {
      title: 'IT'
    },
    {
      title: 'Искусство'
    },
    {
      title: 'Книги'
    },
    {
      title: 'Игры'
    },
    {
      title: 'Автомобили'
    },
    {
      title: 'Рыбалка'
    },
    {
      title: 'Общение'
    }
  ];
  
  selectedInterests = [];

  constructor() { }

  ngOnInit() {
  }

  onClick(interest: any): void {
    const idx = this.selectedInterests.findIndex(i => i.title === interest.title);

    if (idx !== -1) {
      this.selectedInterests.splice(idx, 1);

    } else {
      this.selectedInterests.push(interest);
    }
  }

  isSelected(interest: any): boolean {
    return this.selectedInterests.some(i => i.title === interest.title);
  }
}
