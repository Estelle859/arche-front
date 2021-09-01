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
  
  user:User = {}; 
  erreur = '';
  invalidLogin = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,   
    private authService: AuthenticationService,
   
    ) { }

  ngOnInit(): void {   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }  

  login(): void {   
    this.authService.login(this.user.nom||'', this.user.motdepasse||'')
    .subscribe(
      data => {
          console.log("dta",data)
          this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log("user connexon not  ok");
        this.erreur = 'Identifiants incorrects';  
      });
    // this.authService.login(this.user.nom||'', this.user.motdepasse||''); 
    // console.log("login", this.authService.login(this.user.nom||'', this.user.motdepasse||''))    
    // if(this.authService.isUserLoggedIn()) {
    //     console.log("user connexion ok");  
    //     this.router.navigate([this.returnUrl]);            
    //   } else {
    //     console.log("user connexon not  ok");
    //     this.erreur = 'Identifiants incorrects';      
    //   }
    
    // this.authService.login(this.user.nom||'', this.user.motdepasse||'');
    // if(this.authService.isUserLoggedIn()){
    //   console.log("USER LOGGED IN")
    //   //this.panierService.loadCaddyFromLocalStorage();
    //   this.router.navigateByUrl('');
    // }else{
    //   console.log("USER not LOGGED IN")
    // }
   } 
  
  
}
