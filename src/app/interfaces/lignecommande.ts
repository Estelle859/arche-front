import { Article } from "./article";

export interface Lignecommande {
    id?:number;
    qty?: number;
    article?: Article; 
    prix?:number;   
}
