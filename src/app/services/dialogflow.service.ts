import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';
const FAILURE = "failure";
const SUCCESS = "success";
@Injectable({
  providedIn: 'root'
})
export class DialogflowService {
  private apiRoot : string = "http://localhost:3000";
  private baseURL: string = "http://localhost:4203/api";
  //private baseURL: string = "http://35.200.131.47:4205/api";
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
  
  getProjectDetails(projectid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/getprojectdetails';
      this.http.post(url, { pid: projectid }, httpOptions).subscribe(res => {
        if (res['status'] == SUCCESS) {
          resolve(res['data']);
        }
      });
    });
  }
  
 getFlow(pid){
  return new Promise((resolve, reject) => {
    this.http.get(this.apiRoot + '/api/flows/'+pid).subscribe(res => {
      if(res['status'] == SUCCESS){
        resolve(res['data'][0]);
      }
    });
  });
 }
 saveFlow(details) {
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = this.apiRoot + '/api/flows';
    this.http.post(url, details, httpOptions).subscribe(res => {
      resolve(res);
    });
  });
 }
}
