import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private loginService: LoginService) {}

  isLoggedIn(): boolean {
<<<<<<< HEAD
    // return true;
    return this.loginService.isLoggedIn();
=======
    return true;
    //return this.loginService.isLoggedIn();
>>>>>>> 14b2138691fd2fa56d83a4a3f49bedf5d411e6a7
  }
}
