import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    });

  }

  onToggle(){
    this.sidenavToggle.emit();
  }

  onLoggedOut(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
