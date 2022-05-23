import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Material } from '../material/Material';
import { Appro } from './Appro';

@Injectable({
  providedIn: 'root'
})
export class ApproService {

  private apiServerUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  public getAppro(): Observable<Appro[]>{
    return this.http.get<Appro[]>(`${this.apiServerUrl}/appro`);
  }

  public getByIdAppro(id: number): Observable<Appro>{
    return this.http.get<Appro>(`${this.apiServerUrl}/appro/${id}`);
  }

  public findByMaterial(material: Material): Observable<Appro[]>{
    return this.http.get<Appro[]>(`${this.apiServerUrl}/appro/material/${material.id}`);
  }

  public addAppro(appro: Appro): Observable<Appro>{
    const params = new HttpParams()
    .set('date' , appro.date)
    .set('moyen_id' , appro.moyen.id)
    .set('id_material' , appro.material.id)
    .set('qte' , appro.qte)
    .set('hasSerialNumber' , appro.hasSerialNumber)
    return this.http.post<Appro>(`${this.apiServerUrl}/appro` , params);
  }

  public updateAppro(appro: Appro): Observable<string>{
    console.log(appro);
    const params = new HttpParams()
    .set('date' , appro.date)
    .set('moyen_id' , appro.moyen.id)
    .set('id_material' , appro.material.id)
    .set('qte' , appro.qte)
    .set('hasSerialNumber' , appro.hasSerialNumber)
    return this.http.put<string>(`${this.apiServerUrl}/appro/${appro.id}` , params);
  }

  public deleteAppro(appro: Appro):Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/appro/${appro.id}`);
  }

}
