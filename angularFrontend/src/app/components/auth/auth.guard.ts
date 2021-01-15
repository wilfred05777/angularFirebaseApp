import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        // check if it is authenticated
        if(this.authService.isAuth()){
            return true;
        } 
        // if it is not authenticated
        else {
            this.router.navigate(['/login']);
        }
        
        // return true;
        // return this.authService.isAuth();
    }
    
}