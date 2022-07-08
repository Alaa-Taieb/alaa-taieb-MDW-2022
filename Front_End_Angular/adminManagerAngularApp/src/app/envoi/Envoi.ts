import { MoyenAppro } from './../moyenAppro/MoyenAppro';

export interface Envoi{
    id?: number,
    date?: string,
    moyen?: MoyenAppro,
    qte?: number
}