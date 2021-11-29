import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PanierService } from 'src/app/services/paniers/panier.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: any = 0;

  constructor(public authService: AuthenticationService,
    public panierService: PanierService,
    private router: Router,
    ) { }
  
    ngOnInit() {
  
    } 
    ngOnDestroy() {
    
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  

}
