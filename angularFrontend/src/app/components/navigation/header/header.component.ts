import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.services';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authStatus) => {
    //     this.isAuth = authStatus;
    //   }
    // );
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  onLoggedOut() {
    this.authService.logout();
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
