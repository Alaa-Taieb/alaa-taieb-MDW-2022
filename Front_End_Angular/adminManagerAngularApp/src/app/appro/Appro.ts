import { Material } from './../material/Material';
import { MoyenAppro } from './../moyenAppro/MoyenAppro';


export interface Appro{
    id?: number,
    date?: string,
    moyen?: MoyenAppro,
    material?: Material,
    qte?: number,
    hasSerialNumber?: boolean
}