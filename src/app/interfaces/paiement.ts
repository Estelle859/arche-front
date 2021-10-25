import { Client } from "./client";
import { Commande } from "./commande";

export interface Paiement {
    id? : number;
    datePaiement? : Date;   
    numeroCarte?: number;
    typeCarte?:string;  
    commande?: Commande;
}
