import { User } from '../user/User';
import { FileEntity } from './../fileEntity/FileEntity';
export interface Reunion{
    id?: number,
    creation_date?: string,
    scheduled_date?: string,
    state?: string,
    pv?: FileEntity,
    reunion_invited?: User[],
    reunion_assisted?: User[],
    sujet?: string
}