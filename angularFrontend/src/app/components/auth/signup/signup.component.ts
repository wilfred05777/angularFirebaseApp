import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private loadingSubs: Subscription;
  maxDate;
  isLoading = false;

  constructor(private AuthService: AuthService, private uiservice: UIService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiservice.loadingStateChanged.subscribe(
      (isloading) => {
        this.isLoading = isloading;
      }
    );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.AuthService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
