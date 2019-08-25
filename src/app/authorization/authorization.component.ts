import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from './authorization.service';

@Component({
	selector: 'app-auth',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit {

	constructor(private authService: AuthorizationService) {
		
	}

	ngOnInit() {
		console.log(this);
	}

	onSubmit(form: NgForm) {
		let value = form.form.value;
		this.authService.signinUser(JSON.stringify(value));
	}

	isAuth(): boolean {
		return this.authService.isAuth();
	}
}