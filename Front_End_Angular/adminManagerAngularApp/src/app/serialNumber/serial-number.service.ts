import { Appro } from './../appro/Appro';
import { SerialNumber } from './SerialNumber';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerialNumberService {


  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getSerialNumbers(): Observable<SerialNumber[]>{
    return this.http.get<SerialNumber[]>(`${this.apiServerUrl}/serialNumber`);
  }

  public getSerialNumber(id: number): Observable<SerialNumber>{
    return this.http.get<SerialNumber>(`${this.apiServerUrl}/serialNumber/${id}`);
  }

  public getSerialNumbersByAppro(appro: Appro): Observable<SerialNumber[]>{
    return this.http.get<SerialNumber[]>(`${this.apiServerUrl}/serialNumber/appro/${appro.id}`);
  }

  public addSerialNumber(serialNumber: SerialNumber): Observable<string>{
    let params;
    if(serialNumber.user == undefined){
      params = new HttpParams().set('number' , serialNumber.number)
      .set('appro_id' , serialNumber.appro.id)
      .set('appointed' , serialNumber.appointed);
    }else{
      params = new HttpParams().set('number' , serialNumber.number)
      .set('appro_id' , serialNumber.appro.id)
      .set('user_id' , serialNumber.user.id)
      .set('appointed' , serialNumber.appointed);
    }
    
    console.log(params);

    return this.http.post<string>(`${this.apiServerUrl}/serialNumber` , params);
  }

  public updateSerialNumber(serialNumber: SerialNumber): Observable<string>{
    let params;
    if(serialNumber.user == undefined){
      params = new HttpParams().set('number' , serialNumber.number)
      .set('appro_id' , serialNumber.appro.id)
      .set('user_id' , -1)
      .set('appointed' , serialNumber.appointed);
    }else{
      params = new HttpParams().set('number' , serialNumber.number)
      .set('appro_id' , serialNumber.appro.id)
      .set('user_id' , serialNumber.user.id)
      .set('appointed' , serialNumber.appointed);
    }

    return this.http.put<string>(`${this.apiServerUrl}/serialNumber/${serialNumber.id}` , params);
  }

  public deleteSerialNumber(id: number): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/serialNumber/${id}`);
  }

}
