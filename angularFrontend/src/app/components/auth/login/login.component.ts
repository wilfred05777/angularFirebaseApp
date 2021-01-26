import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.services';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // isLoading = false;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  // loginForm = new FormGroup({
  //   "email": new FormControl("", Validators.required),
  //   "password": new FormControl("", Validators.required)
  // });

  // loginForm = this.fb.group({
  //   email: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiservice: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  ngOnInit(): void {
    // this.store.subscribe((data) => console.log(data));
    // puting a $ dollar sign is convention use in NgRx
    this.isLoading$ = this.store.pipe(map((state) => state.ui.isLoading));
    // // this.isLoading$ = this.store.pipe(
    // //   map((state) => {
    // //     state.ui.isLoading;
    // //   })
    // // );
    // this.loadingSubs = this.uiservice.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    //
    // console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
