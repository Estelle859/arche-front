import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],   
  });
  }


  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  public onCancel = () => {
    this.location.back();
  }
  public createUser = (registerFormValue:any) => {
    console.log("user for value",registerFormValue)
    if (this.registerForm.valid) {
      this.executeUserCreation(registerFormValue);
    }
  }
  private executeUserCreation = (registerFormValue:any) => {
    let user: User = {
      nom: registerFormValue.nom,
      prenom:registerFormValue.prenom,
      adresse:registerFormValue.adresse,
      telephone:registerFormValue.telephone,
      motdepasse:registerFormValue.motdepasse,
      email:registerFormValue.email,
    }
 
   
    this.userService.register(user)
      .subscribe(res => {
       console.log("user is registered")
        this.location.back();
      },
      (error => {
        console.log("user is not registered")
        this.location.back();
      })
    )
  }
  

}
