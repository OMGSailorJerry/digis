import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthorizationGruard implements CanActivate {
    constructor(private AuthorizationService: AuthorizationService, private router: Router) { }

    canActivate() {
        if (this.AuthorizationService.isAuth()) {
            return true;
        } else {
            this.router.navigateByUrl('/main');
            return false;
        }
    }
}