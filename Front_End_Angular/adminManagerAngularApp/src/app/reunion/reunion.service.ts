import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Reunion } from './Reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  private apiServerUrl = 'http://localhost:8080'; 


  constructor(private http: HttpClient) { }

  public getAll(): Observable<Reunion[]>{
    return this.http.get<Reunion[]>(`${this.apiServerUrl}/reunion`);
  }

  public getById(id: number): Observable<Reunion>{
    return this.http.get<Reunion>(`${this.apiServerUrl}/reunion/${id}`);
  }

  public checkDate(date: number , id: number): Observable<boolean>{
    let params = new HttpParams().set('date' , date).set('reunion_id' , id);
    return this.http.post<boolean>(`${this.apiServerUrl}/reunion/checkDateAvailability` , params);
  }

  public add(reunion: Reunion): Observable<Reunion>{
    let params = new HttpParams()
    .set("creation_date" , Date.now())
    .set("scheduled_date" , new Date(reunion.scheduled_date).getTime())
    .set("sujet" , reunion.sujet);
    let invited = new Array();
    reunion.reunion_invited.forEach(element => {
      invited.push(element.id);
      params = params.append('invited' , element.id);
    });
    console.log(params);
    return this.http.post<Reunion>(`${this.apiServerUrl}/reunion` , params);
  }

  public update(reunion: Reunion): Observable<Reunion>{
    let params = new HttpParams()
    .set("scheduled_date" , new Date(reunion.scheduled_date).getTime())
    .set("sujet" , reunion.sujet)
    return this.http.put<Reunion>(`${this.apiServerUrl}/reunion/${reunion.id}` , params);
  }

  public updatePV(reunion: Reunion , file_id: number): Observable<Reunion>{
    let params = new HttpParams()
    .set("fileEntity_id" , file_id);
    return this.http.put<Reunion>(`${this.apiServerUrl}/reunion/${reunion.id}/pv` , params);
  }

  public updateState(reunion: Reunion): Observable<Reunion>{
    let params = new HttpParams()
    .set("state" , reunion.state);
    return this.http.put<Reunion>(`${this.apiServerUrl}/reunion/${reunion.id}/state` , params);
  }

  public updateInvites(reunion: Reunion): Observable<Reunion>{
    let params = new HttpParams();
    reunion.reunion_invited.forEach(element => {
      params = params.append('invited' , element.id);
    })
    return this.http.put<Reunion>(`${this.apiServerUrl}/reunion/${reunion.id}/invites` , params);
  }

  public updateAssistes(reunion: Reunion): Observable<Reunion>{
    let params = new HttpParams();
    reunion.reunion_assisted.forEach(element => {
      params = params.append('assisted' , element.id);
      console.log(element);
    })
    console.log(params);
    return this.http.put<Reunion>(`${this.apiServerUrl}/reunion/${reunion.id}/assistes` , params);
  }

  public delete(reunion: Reunion): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/reunion/${reunion.id}`);
  }

}
