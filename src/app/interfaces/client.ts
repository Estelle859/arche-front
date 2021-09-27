import { Adresse } from "./adresse";


export interface Client {
    id?: number;
    nom?: string;
    prenom?: string;  
    adresses?: Adresse[];
    email?: string;
    motdepasse?: string;
    telephone?: string;
}

