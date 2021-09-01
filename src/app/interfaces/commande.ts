import { Article } from "./article";
import { LignePanier } from "./ligne-panier";
import { User } from "./user";

export interface Commande {
    id : number;
    date : Date;    
    user : User;
    totalMontant : number;
    lignecommandes : Array <LignePanier>;

}
