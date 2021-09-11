import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // user:User = {}; 
  // erreur = '';
  // invalidLogin = false;
  // returnUrl: string;
  // loading = false;
  // submitted=false;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,   
  //   private authService: AuthenticationService,
   
  //   ) { }

  // ngOnInit(): void { 
  //   this.authService.logout();  
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; 
  // }  

  // login(): void { 
  //   this.loading = true;  
  //   this.authService.login(this.user.nom||'', this.user.motdepasse||'')
  //   .subscribe(
  //     res => {
  //         console.log("data",res);
  //         this.router.navigate([this.returnUrl]);      
  //     },
  //     error => {
  //       console.log("user connexion not  ok");
  //       this.erreur = 'Identifiants incorrects';
  //       this.loading = false;  
  //     });
   
 
  //  } 
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
     
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.authenticated) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        
          .subscribe(
              data => {
                  console.log("DATA LOGIN RETURNED FROM BACK",data) 
                  if(data==null)    {
                     alert("login incorrect, please register!!!");                  
                     this.router.navigate(['/register']);
                  }  else{
                    this.router.navigate([this.returnUrl]);
                  }         
                 
              },
              error => {
                  alert(error);
                  this.loading = false;
              });
  }
  
  
}
