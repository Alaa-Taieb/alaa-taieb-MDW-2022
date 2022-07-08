import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recieve } from './Recieve';

@Injectable({
  providedIn: 'root'
})
export class RecieveService {

  private apiServerUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Recieve[]>{
    return this.http.get<Recieve[]>(`${this.apiServerUrl}/courrier/recieve`);
  }

  public getById(id: number): Observable<Recieve>{
    return this.http.get<Recieve>(`${this.apiServerUrl}/courrier/recieve/${id}`);
  }

  public create(recieve: Recieve): Observable<Recieve>{
    const params = new HttpParams()
    .set("date" , recieve.date)
    .set("moyen_id" , recieve.moyen.id)
    .set("description" , recieve.description);
    return this.http.post<Recieve>(`${this.apiServerUrl}/courrier/recieve` , params);
  }

  public update(recieve: Recieve): Observable<Recieve>{
    const params = new HttpParams()
    .set("date" , recieve.date)
    .set("moyen_id" , recieve.moyen.id)
    .set("description" , recieve.description);
    return this.http.put<Recieve>(`${this.apiServerUrl}/courrier/recieve/${recieve.id}` , params);
  }

  public delete(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/courrier/recieve/${id}`);
  }
}
