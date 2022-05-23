import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoyenAppro } from './MoyenAppro';

@Injectable({
  providedIn: 'root'
})
export class MoyenApproService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAllMoyen(): Observable<MoyenAppro[]>{
    return this.http.get<MoyenAppro[]>(`${this.apiServerUrl}/moyenappro`);
  }

  public getMoyen(id: number): Observable<MoyenAppro>{
    return this.http.get<MoyenAppro>(`${this.apiServerUrl}/moyenappro/${id}`);
  }

  public addMoyen(moyen: MoyenAppro): Observable<MoyenAppro>{
    const params = new HttpParams()
    .set('name' , moyen.name);

    return this.http.post<MoyenAppro>(`${this.apiServerUrl}/moyenappro` , params);
  }

  public updateMoyen(moyen: MoyenAppro): Observable<string>{
    const params = new HttpParams()
    .set('name' , moyen.name);

    return this.http.put<string>(`${this.apiServerUrl}/moyenappro/${moyen.id}` , params);
  }

  public deleteMoyen(moyen: MoyenAppro): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/moyenappro/${moyen.id}`);
  }
}
