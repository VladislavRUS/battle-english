import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
