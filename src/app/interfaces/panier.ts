import { Article } from "./article";
import { Client } from "./client";
import { LignePanier } from "./ligne-panier";

export interface Panier {
    id?: number;
    addedOn?  : Date;  
    article? : Article;
    client? : Client;
    nbrArticle? : number; 
    montant? : number;
    lPaniers? : Array <LignePanier> ;
}
