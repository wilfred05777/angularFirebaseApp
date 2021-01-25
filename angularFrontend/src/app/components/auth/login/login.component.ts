import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private loadingSubs: Subscription;
  isLoading = false;

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
    private uiservice: UIService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiservice.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
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
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
