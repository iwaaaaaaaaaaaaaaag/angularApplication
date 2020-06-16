import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    errors: any = []
    test : Date = new Date();
    constructor(
        private authService: AuthService,
        private router: Router
        ) { }

    ngOnInit() {}

    register(registerForm) {
        this.authService.register(registerForm.value).subscribe(
            (result) =>{
                console.log("Success!")
                //routerLinkとやっている事は一緒
                this.router.navigate(['/login'])
            },
            (err: HttpErrorResponse) => {
                console.error(err)
                this.errors = err.error.errors
            }
        )
    }
}
