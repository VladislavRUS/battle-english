import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'landing-login',
  templateUrl: './landing-login.component.html'
})
export class LandingLoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onClick(): void {
    // this.loginService.loggedIn = true;
    this.loginService.initVkAuth().then(() => {
      this.router.navigateByUrl('/games');
    });
  }

}
