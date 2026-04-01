import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
    constructor(private authorizationService: AuthorizationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authorizationService.isAuth()) {
            return true;
        } else {
            this.router.navigateByUrl('/main');
            return false;
        }
    }
}
