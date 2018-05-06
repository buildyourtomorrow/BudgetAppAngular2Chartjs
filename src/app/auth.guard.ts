import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';

import { GetBYTUser } from './dashboard/byt-dashboard-overview.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      console.log('passed')
      return true;
    }  
    else {
      console.log('blocked')
      this.router.navigate(['home']);
      return false;
    }
  }
}

@Injectable()
export class AuthCheck implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      console.log('passed')
      this.router.navigate(['../app-menu'])
      return true;
    }  
    else {
      console.log('blocked')
      //this.router.navigate(['/login']);
      return true;
    }
  }
}

@Injectable()
export class BYTProGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router, _getBYTUser: GetBYTUser) {} 

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log( localStorage.getItem('byt_paying_customer') );

    if(this.auth.authenticated() && localStorage.getItem('byt_paying_customer') === 'true' ) {
      console.log('user is authenticated and a paying customer')
      return true;
    }
    if(this.auth.authenticated() && localStorage.getItem('byt_paying_customer') === 'false' ) {
      console.log('user is authenticated but not a paying customer')
      this.router.navigate(['byt-profile']);
      return false;
    }
    else {
      console.log('blocked - user not authenticated')
      this.router.navigate(['home']);
      return false;
    }
  }
}