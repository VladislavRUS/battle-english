import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService, private tooltipService: TooltipService) { }

  ngOnInit() {
  }

  openUserTooltip(userElement: HTMLElement): void {
    this.tooltipService.openTooltip('userTooltip', userElement);
  }

  isTooltipOpened(): boolean {
    return this.tooltipService.isOpened();
  }
}
