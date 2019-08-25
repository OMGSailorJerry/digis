import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService {
    user: {
        property: string;
    };
    constructor(private router: Router) { }

    signinUser(fromForm: string) {
        this.user = JSON.parse(fromForm);
        this.router.navigate(['/main']);
    }

    isAuth(): boolean {
        return this.user ? true : false
    }

    logout() {
        this.user = undefined;
        this.router.navigate(['/auth']);
    }
}