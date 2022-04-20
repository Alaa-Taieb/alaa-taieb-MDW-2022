import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  
  public username: string;
  public password: string;

  constructor(private http: HttpClient) {
    this.username = '';
    this.password = '';
  }


  authenticate(username: string , password: string): Observable<any>{
    const params = new HttpParams()
    .set('login' , username)
    .set('password' , password);

    const body = { login: username , password: password }
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<any>(`http://localhost:8080/authenticate` , body , httpOptions );
    
  }

  
}