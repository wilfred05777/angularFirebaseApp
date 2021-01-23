import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';

  openSidenav = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
