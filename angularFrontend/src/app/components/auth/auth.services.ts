import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from 'src/app/training/training/training.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../../app.reducer';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiservice: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch({ type: 'START_LOADING' });
    // this.uiservice.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiservice.loadingStateChanged.next(false);
        // this.authSuccessfully();
        // console.log(result)
      })
      .catch((error) => {
        // this.uiservice.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.uiservice.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null, {
        //   duration: 3000,
        // });
        // console.log(error);
      });
    // this.user = {
    //     email: authData.email,
    //     userId: Math.round(Math.random()* 10000).toString()
    // };
    // this.authSuccessfully();
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    // this.uiservice.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiservice.loadingStateChanged.next(false);
        // this.authSuccessfully();
        // console.log(result)
      })
      .catch((error) => {
        // this.uiservice.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.uiservice.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null, {
        //   duration: 3000,
        // });
        // console.log(error);
      });
    // this.user = {
    //     email: authData.email,
    //     userId: Math.round(Math.random()*10000).toString()
    // };
    // this.authSuccessfully();
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
  }

  logout() {
    // this.trainingService.cancelSubscriptions();
    // // this.user = null;
    this.afAuth.signOut();
    // this.authChange.next(false);
    // this.router.navigate(['/login']);
    // this.isAuthenticated = false;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
    // return this.user !=null;
  }

  private authSuccessfully() {
    // this.isAuthenticated = true;
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
  }
}
