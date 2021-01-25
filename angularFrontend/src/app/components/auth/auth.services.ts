import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from 'src/app/training/training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/ui.service';

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
    private uiservice: UIService
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
    this.uiservice.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiservice.loadingStateChanged.next(false);
        // this.authSuccessfully();
        // console.log(result)
      })
      .catch((error) => {
        this.uiservice.loadingStateChanged.next(false);
        this.snackbar.open(error.message, null, {
          duration: 3000,
        });
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
    this.uiservice.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiservice.loadingStateChanged.next(false);
        // this.authSuccessfully();
        // console.log(result)
      })
      .catch((error) => {
        this.uiservice.loadingStateChanged.next(false);
        this.snackbar.open(error.message, null, {
          duration: 3000,
        });
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
