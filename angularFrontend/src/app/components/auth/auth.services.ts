import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';
// import { firebase } from 'firebase/auth';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User

    constructor(private router: Router, private afAuth: AngularFireAuth){}

    registerUser(authData: AuthData){
        this.afAuth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result =>{
                console.log(result)
            })
            .catch(error =>{
                console.log(error)
            })
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()* 10000).toString()
        // };
        this.authSuccessfully();
        // this.authChange.next(true);
        // this.router.navigate(['/training']);
    }

    login(authData: AuthData){
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result =>{
            console.log(result)
        })
        .catch(error =>{
            console.log(error)
        })
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()*10000).toString()
        // };
        this.authSuccessfully();
        // this.authChange.next(true);
        // this.router.navigate(['/training']);
    }

    logout(){
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(){
        return { ...this.user };
    }

    isAuth(){
        return this.user !=null;
    }

    private authSuccessfully(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}