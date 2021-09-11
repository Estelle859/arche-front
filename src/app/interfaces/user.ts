import { Adresse } from './adresse';
export interface User {
    id?: number;
    nom?: string;
    prenom?: string;
    adresses?: Adresse[];
    email?: string;
    motdepasse?: string;
    telephone?: string;
}
