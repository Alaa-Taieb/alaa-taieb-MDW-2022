import { Envoi } from './../envoi/Envoi';
import { DocumentType } from './../documentType/DocumentType';
import { FileEntity } from './../fileEntity/FileEntity';
import { User } from './../user/User';
export interface Document{
    id?: number,
    code?: string,
    user?: User,
    file_id?: number,
    file?: FileEntity,
    date?: string,
    sent?: boolean,
    send_date?: string,
    documentType?: DocumentType,
    envoi?: Envoi
}