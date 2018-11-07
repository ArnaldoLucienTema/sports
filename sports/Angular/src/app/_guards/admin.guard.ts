import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (JSON.parse(localStorage.getItem('session_user')).admin) {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/requirement-selection']);
        return false;
    }
}
