import { Article } from "./article";
import { User } from "./user";
import { LignePanier } from "./ligne-panier";
import { Client } from "./client";

export interface Panier {
    id?: number;
    lPaniers? : LignePanier[] ;
    client? : Client;
    prixTotal? : number;
    // dateCommande?  : Date;  
    // article? : Article;   
    // nbrArticle? : number; 
    // montant? : number;  

}
