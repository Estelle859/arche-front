import { Article } from "./article";
import { Panier } from "./panier";

export interface LignePanier {
    id?: number;
    addedOn?: Date;
    qty?: number;  
    article?: Article; 
    //prixUnitaire?: number;
    // libelle: String; 
    //tva:number;
    // prixttc:number;
    // prixtva:number;
    // prixht:number;
    // montant:number;

}
