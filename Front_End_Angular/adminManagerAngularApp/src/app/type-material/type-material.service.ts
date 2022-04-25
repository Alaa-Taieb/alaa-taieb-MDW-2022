import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeMaterial } from './TypeMaterial';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterialService {

  private apiServerUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<TypeMaterial[]>{
    return this.http.get<TypeMaterial[]>(`${this.apiServerUrl}/type`);
  }

  public getType(id:number): Observable<TypeMaterial>{
    return this.http.get<TypeMaterial>(`${this.apiServerUrl}/type/${id}`);
  }

  public addType(type:TypeMaterial): Observable<string>{
    const params = new HttpParams().set("name" , type.name);
    return this.http.post<string>(`${this.apiServerUrl}/type` , params);
  }

  public updateType(type:TypeMaterial): Observable<string>{
    return this.http.put<string>(`${this.apiServerUrl}/type/${type.id}` , type);
  }

  public deleteType(id:number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/type/${id}`);
  }
}
