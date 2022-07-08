import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileEntity } from './FileEntity';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiServerUrl = 'http://localhost:8080';  

  constructor(private http: HttpClient) { }

  public getFiles(): Observable<FileEntity[]>{
    return this.http.get<FileEntity[]>(`${this.apiServerUrl}/file`);
  }

  public getFile(id: number): Observable<FileEntity>{
    return this.http.get<FileEntity>(`${this.apiServerUrl}/file/${id}`);
  }

  public downloadFile(id: number): Observable<Blob>{
    return this.http.get(`${this.apiServerUrl}/file/download/${id}` , {responseType: 'blob'});
  }

  public uploadFile(file: File): Observable<FileEntity>{
    let formParams = new FormData();
    formParams.append('file',file);
    return this.http.post<FileEntity>(`${this.apiServerUrl}/file` , formParams , {reportProgress: true});
  }

  public deleteFile(file: FileEntity): Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/file/${file.id}`);
  }
}
