import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../auth.service';
import { AppService, ResponseType } from '../app.service';
import { System } from '../interface/app-config';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  systems: System[];

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.systems = this.appService.appConfig.Systems;
  }

  logout() {
    this.authService.logout().subscribe(response => {
      if (response.success) {
        window.location.reload();
      }
    });
  }

}
