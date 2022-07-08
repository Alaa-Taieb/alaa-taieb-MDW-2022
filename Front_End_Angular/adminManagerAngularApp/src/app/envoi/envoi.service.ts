import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Envoi } from './Envoi';

@Injectable({
  providedIn: 'root'
})
export class EnvoiService {

  private apiServerUrl = 'http://localhost:8080'; 
  
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Envoi[]>{
    return this.http.get<Envoi[]>(`${this.apiServerUrl}/courrier/envoi`);
  }

  public getById(id: number): Observable<Envoi>{
    return this.http.get<Envoi>(`${this.apiServerUrl}/courrier/envoi/${id}`);
  }

  public create(envoi: Envoi): Observable<Envoi>{
    const params = new HttpParams()
    .set("date" , envoi.date)
    .set("moyen_id" , envoi.moyen.id)
    .set("qte" , envoi.qte);
    return this.http.post<Envoi>(`${this.apiServerUrl}/courrier/envoi` , params);
  }

  public update(envoi: Envoi): Observable<Envoi>{
    const params = new HttpParams()
    .set("date" , envoi.date)
    .set("moyen_id" , envoi.moyen.id)
    .set("qte" , envoi.qte);
    return this.http.put<Envoi>(`${this.apiServerUrl}/courrier/envoi/${envoi.id}` , params);
  }

  public delete(id: number){
    return this.http.delete<string>(`${this.apiServerUrl}/courrier/envoi/${id}`);
  }
}
