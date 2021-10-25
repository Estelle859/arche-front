import { Article } from "./article";

export interface Lignecommande {
    id?:number;
    quantiteCommande?: number;
    article?: Article; 
    prixUnitaire?:number;   
}
