import { Envoi } from './../envoi/Envoi';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Document } from './Document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiServerUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Document[]>{
    return this.http.get<Document[]>(`${this.apiServerUrl}/document`);
  }

  public getById(id: number): Observable<Document>{
    return this.http.get<Document>(`${this.apiServerUrl}/document/${id}`);
  }

  public getByEnvoi(envoi: Envoi): Observable<Document[]>{
    return this.http.get<Document[]>(`${this.apiServerUrl}/document/envoi/${envoi.id}`);
  }

  public add(b: Document): Observable<Document>{
    const params = new HttpParams()
    .set("user_id" , b.user.id)
    .set("file_id" , b.file_id)
    .set("code" , b.code)
    .set("date" , b.date)
    .set("sent" , b.sent)
    .set("documentTypeId" , b.documentType.id);
    console.log(params);
    return this.http.post<Document>(`${this.apiServerUrl}/document` , params);
  }

  public update(b: Document): Observable<Document>{
    let params;
    if(b.sent){
      params = new HttpParams()
      .set("sent" , b.sent)
      .set("user_id" , b.user.id)
      .set("file_id" , b.file_id)
      .set("code" , b.code)
      .set("date" , b.date)
      .set("date_sent" , b.send_date)
      .set("documentTypeId" , b.documentType.id);
    }else{
      params = new HttpParams()
      .set("sent" , b.sent)
      .set("user_id" , b.user.id)
      .set("file_id" , b.file_id)
      .set("code" , b.code)
      .set("date" , b.date)
      .set("documentTypeId" , b.documentType.id);
    }
    
    return this.http.put<Document>(`${this.apiServerUrl}/document/${b.id}`, params);
  }

  public switchSent(b: Document): Observable<Document>{
    const params = new HttpParams().set("envoi_id" , b.envoi.id);
    return this.http.put<Document>(`${this.apiServerUrl}/document/envoyer/${b.id}` , params);
  }

  public markUnsent(id: number): Observable<Document>{
    return this.http.put<Document>(`${this.apiServerUrl}/document/unsend/${id}` , null);
  }

  public delete(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/document/${id}`);
  }
}
