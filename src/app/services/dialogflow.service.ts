import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private baseURL: string = "http://localhost:4203/api";
  constructor(private http: HttpClient){}
  project ;
  public getResponse(msg:Message,botinit){
    debugger;
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };  
      this.http.post(this.baseURL, {pid:this.project,q:msg.content}, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
}
