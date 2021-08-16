import { Auteur } from "./auteur";
import { Genre } from "./genre";

export interface Article {
    id: number;
    resume: string;
    quantite: number;
    prixUnitaire: number;
    titre: string;
    image: string;
    isbn: string;
    format: string;
    type: string;    
    auteurs: Auteur[];
    genres: Genre[];
}
