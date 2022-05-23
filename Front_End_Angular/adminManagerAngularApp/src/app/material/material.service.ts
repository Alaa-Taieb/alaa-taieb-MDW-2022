import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from './Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private apiServerUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  public getMaterials(): Observable<Material[]>{
    return this.http.get<Material[]>(`${this.apiServerUrl}/material`);
  }

  public getMaterial(id: number): Observable<Material>{
    return this.http.get<Material>(`${this.apiServerUrl}/material/${id}`);
  }

  public addMaterial(material: Material): Observable<string>{
    const params = new HttpParams()
    .set('name' , material.name)
    .set('type_id' , material.type.id)
    return this.http.post<string>(`${this.apiServerUrl}/material` , params);
  }

  public updateMaterial(material: Material): Observable<string>{
    const params = new HttpParams()
    .set('name' , material.name)
    .set('type_id' , material.type.id)
    return this.http.put<string>(`${this.apiServerUrl}/material/${material.id}` , params);
  }

  public deleteMaterial(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/material/${id}`);
  }
}
