// import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.services';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // // check if it is authenticated
    // if (this.authService.isAuth()) {
    //   return true;
    // }
    // // if it is not authenticated
    // else {
    //   this.router.navigate(['/login']);
    // }
    // // return true;
    // // return true;
    // // return this.authService.isAuth();
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // // check if it is authenticated
    // if (this.authService.isAuth()) {
    //   return true;
    // }
    // // if it is not authenticated
    // else {
    //   this.router.navigate(['/login']);
    // }
  }
}
