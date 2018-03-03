import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'app-user-tooltip',
  templateUrl: './user-tooltip.component.html'
})
export class UserTooltipComponent implements OnInit {

  constructor(private loginService: LoginService, private tooltipService: TooltipService) { }

    ngOnInit() { }

    logout(): void {
        this.tooltipService.closeTooltip();
        this.loginService.logoutVk();
    }
}
