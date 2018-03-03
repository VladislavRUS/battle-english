import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  private games: any[];

  constructor() { }

  ngOnInit() {
    this.games = [
      {
        number: '01',
        title: 'Балда',
        class: '_blockhead',
        description: 
        `Лингвистическая настольная игра \n 
        для 2-4 игроков, в которой необходимо \n
        составлять слова с помощью букв`,
        online: Math.floor(Math.random() * 1000)
      },
      {
        number: '02',
        title: 'Квиз плиз',
        class: '_quizplease',
        description: 
        `Популярная командная игра,\n
        в которой для победы пригодится \n
        логика, эрудиция и сообрзительность
        `,
        online: Math.floor(Math.random() * 1000)
      },
      {
        number: '03',
        title: '4 картинки 1 слово',
        class: '_four-images-one-word',
        description: 
        `Есть одно слово, которое связывает \n
        4 картинки. Что это за слово? Поиграй \n
        и пойми, почему все любят эту игру`,
        online: Math.floor(Math.random() * 1000)
      },
      {
        number: '04',
        title: 'Борьба умов',
        class: '_brain-battle',
        description: 
        `Интеллектуальная и увлекательная игра - \n
        викторина, в которой можно состязаться \n
        в знаниях с друзьями и другими игроками`,
        online: Math.floor(Math.random() * 1000)
      },
      {
        number: '05',
        title: 'Да или нет',
        class: '_yes-or-no',
        description: 
        `Решай быстро, что правда, а что нет! \n
        Интересные факты из разных областей \n
        знаний покажут широк ли твой кругозор`,
        online: Math.floor(Math.random() * 1000)
      },
      {
        number: '06',
        title: 'Где логика',
        class: '_where-is-logic',
        description: 
        `Где логика - это словесная игра, в которой \n
        Вам предстоит отгадывать слова, \n
        ориентируясь на картинки`,
        online: Math.floor(Math.random() * 1000)
      }
    ]
  }

}
