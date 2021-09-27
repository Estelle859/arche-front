import { Client } from "./client";
import { LignePanier } from "./ligne-panier";
import { Lignecommande } from "./lignecommande";
import { User } from "./user";

export interface Commande {
    id? : number;
    dateCommande? : Date;    
    client? : Client;
    prixTotal? : number;
    lignecommandes?: Lignecommande[];
}
