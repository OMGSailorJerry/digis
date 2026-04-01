import { Component } from '@angular/core';
import { AuthorizationService } from './authorization/authorization.service';

@Component({
	standalone: false,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	constructor(private authService: AuthorizationService) { }

	isAuth(): boolean {
		return this.authService.isAuth();
	}
	
	onLogout() {
		this.authService.logout();
	}
}
