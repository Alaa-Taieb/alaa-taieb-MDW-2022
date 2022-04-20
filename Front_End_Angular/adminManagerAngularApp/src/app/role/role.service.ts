import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiServerUrl}/roles`);
  }

  public getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/roles/${id}`);
  }

  public addRole(name: string): Observable<String> {
    const params = new HttpParams().set('name' , name);
    return this.http.post<string>(`${this.apiServerUrl}/roles` , params );
  }

  public updateRole(role: Role): Observable<String> {
    return this.http.put<String>(`${this.apiServerUrl}/roles/${role.id}` , role);
  }

  public deleteRole(id: number): Observable<String> {
    return this.http.delete<String>(`${this.apiServerUrl}/roles/${id}`);
  }

  public getRoleByName(name: String): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/roles/byName/${name}`);
  }
}
