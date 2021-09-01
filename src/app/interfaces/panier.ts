import { Article } from "./article";
import { User } from "./user";
import { LignePanier } from "./ligne-panier";

export interface Panier {
    id?: number;
    addedOn?  : Date;  
    article? : Article;
    user? : User;
    nbrArticle? : number; 
    montant? : number;
    lPaniers? : Array <LignePanier> ;
}
