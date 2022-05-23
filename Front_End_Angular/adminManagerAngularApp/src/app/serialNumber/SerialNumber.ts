import { User } from './../user/User';
import { Appro } from 'src/app/appro/Appro';

export interface SerialNumber{
    id?: number,
    number?: string,
    appro?: Appro,
    user?: User,
    appointed?: boolean
}