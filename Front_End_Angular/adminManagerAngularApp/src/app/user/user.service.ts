import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/users/${id}`);
  }

  public addUser(user: User): Observable<String> {
    const params = new HttpParams()
    .set('name' , user.name)
    .set('secondName' , user.secondName)
    .set('email' , user.email)
    .set('birthday' , user.birthday)
    .set('role_id' , user.role.id)
    .set('phoneNumber' , user.phoneNumber)
    .set('login' , user.login)
    .set('password' , user.password);

    return this.http.post<String>(`${this.apiServerUrl}/users`,params);
  }

  public updateUser(user: User): Observable<String> {
    const params = new HttpParams()
    .set('name' , user.name)
    .set('secondName' , user.secondName)
    .set('email' , user.email)
    .set('birthday' , user.birthday)
    .set('role_id' , user.role.id)
    .set('phoneNumber' , user.phoneNumber)
    .set('login' , user.login)
    .set('password' , user.password);
    return this.http.put<String>(`${this.apiServerUrl}/users/${user.id}` , params);
  }

  public deleteUser(user: User): Observable<String> {
    return this.http.delete<String>(`${this.apiServerUrl}/users/${user.id}`);
  }

  public getUserByUsername(username: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/users/username/${username}`);
  }
}
