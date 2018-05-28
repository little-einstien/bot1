import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private baseURL: string = "http://localhost/api/";
  // private token: string = environment.token;
  private token: string = "ce1d01dc31b946fa8740ae14100f5ddb";
   project: string = "ce1d01dc31b946fa8740ae14100f5ddb";

  constructor(private http: HttpClient){}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345'
    }
    let url = this.baseURL + this.project+ '/' +query;
    return new Promise((resolve, reject) => {
        this.http.get(url).subscribe(res => {
          resolve(res);
        });
    });
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
