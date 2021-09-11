import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
      
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.authenticated) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', Validators.required],            
            telephone: ['', Validators.required],
            motdepasse: ['', [Validators.required, Validators.minLength(6)]],
            adresses: this.formBuilder.group({
                'rue': [''],
                'ville': [''],
                'codePostale': ['']
            }),
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alert('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
    }

}