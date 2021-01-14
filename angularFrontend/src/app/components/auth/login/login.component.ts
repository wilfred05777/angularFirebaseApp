import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   "email": new FormControl("", Validators.required),
  //   "password": new FormControl("", Validators.required)
  // });

  loginForm = this.fb.group({
    "email": ['', Validators.required],
    "password":['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  

  onSubmit(){
    //
    console.log(this.loginForm); 
  }

}
