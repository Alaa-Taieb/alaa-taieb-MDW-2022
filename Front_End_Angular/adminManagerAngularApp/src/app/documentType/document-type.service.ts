import { DocumentType } from './DocumentType';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  private apiServerUrl = 'http://localhost:8080'; 


  constructor(private http: HttpClient) { }

  public getAll(): Observable<DocumentType[]>{
      return this.http.get<DocumentType[]>(`${this.apiServerUrl}/document/type`);
  }

  public getById(id: number): Observable<DocumentType>{
    return this.http.get<DocumentType>(`${this.apiServerUrl}/document/type/${id}`);
  }

  public create(typeName: string): Observable<DocumentType>{
    const params = new HttpParams().set("type" , typeName);
    return this.http.post<DocumentType>(`${this.apiServerUrl}/document/type` , params);
  }

  public update(DocumentType: DocumentType): Observable<DocumentType>{
    const params = new HttpParams().set('type' , DocumentType.type);
    return this.http.put<DocumentType>(`${this.apiServerUrl}/document/type/${DocumentType.id}` , params);
  }

  public delete(DocumentType: DocumentType): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/document/type/${DocumentType.id}`);
  }

  public deleteById(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/document/type/${id}`);
  }
}
