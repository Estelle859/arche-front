import { Adresse } from './adresse';
export interface User {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: Adresse;
    email?: string;
    motdepasse?: string;
    telephone?: string;
}
