import { Adresse } from './adresse';
export interface Client {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    motdepasse?: string;
    telephone?: string;
    adresses?: Adresse[];
    lignePanier?: [any]
}
