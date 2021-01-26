import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.services';

import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private loadingSubs: Subscription;
  maxDate;
  // isLoading = false;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private AuthService: AuthService,
    private uiservice: UIService
  ) {}

  ngOnInit(): void {
    // Subscription
    // this.loadingSubs = this.uiservice.loadingStateChanged.subscribe(
    //   (isloading) => {
    //     this.isLoading = isloading;
    //   }
    // );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.AuthService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
