import { Article } from "./article";

export interface LignePanier {
    id?:number;
    quantiteCommande?: number;
    article?: Article; 
    prixUnitaire?:number;   
    // libelle: String; 
    //tva:number;
    // prixttc:number;
    // prixtva:number;
    // prixht:number;
    // montant:number;

}
