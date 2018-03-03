import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'landing-login',
  templateUrl: './landing-login.component.html'
})
export class LandingLoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.loginService.loggedIn = true;
  }

}
