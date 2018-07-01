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

  private apiRoot : string = "http://35.200.198.3:3000";
  private baseURL: string = "http://35.200.198.3:4203/api";
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
      // resolve({"payload":{"entities":[],"intent":{"confidence":0.9740278124809265,"name":"Book Appointment"},"intent_ranking":[{"confidence":0.9740278124809265,"name":"Book Appointment"},{"confidence":0.0034171342849731445,"name":"About google"},{"confidence":-0.06438928097486496,"name":"About me"},{"confidence":-0.37786251306533813,"name":"About Picasi"}],"text":"want to book an appointment for me"},"res":[{"txt_resps":[],"type":1},{"step_resp":{"s1":{"ed_lbl":"Ending","et_lbl":"Time","sd_lbl":"Starting","st_lbl":"Time"},"s2":{"fields":[{"lbl":"Name","ph":"Name"}]},"s3":{"btn_clr":"#f40a0a","btn_txt":"Please submit","btn_txt_clr":"#fa0c0c","msg":"Thanks Please confirm"}},"type":3}]})
      this.http.post(this.baseURL, {pid:this.project,q:msg.content['txt']}, httpOptions).subscribe(res => {
        res['res'] = [res['res']];
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
      let url = `${this.apiRoot}/api/projects/${projectid}`;
      this.http.get(url, httpOptions).subscribe(res => {
        debugger;
        if (res['status'] == SUCCESS) {
          resolve(res['data'][0]);
          
        }
      });
    });
  }
  
 getFlow(pid){
  return new Promise((resolve, reject) => {
    this.http.get(`${this.apiRoot}/api/flows/${pid}`).subscribe(res => {
      if(res['status'] == SUCCESS){
        resolve(res['data'][0]);
      }
      else{
        reject(null);
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
 
 saveAppointment(appointment) {
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/api/appointments`;
    this.http.post(url, appointment, httpOptions).subscribe((res:any) => {
      if (res) {
        // alert(`Your appointment has been submitted to Doctor. Your Booking id is  ${res.id}. Kindly Make the Payment Online.`);
        resolve(res);
      }
      // resolve(res);
    });
  });
}
getSlots(username){
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/api/slots/u/${username}`;
    this.http.get(url, httpOptions).subscribe((res:any) => {
      if (res.status == SUCCESS) {
        resolve(res.data);
      }
      // resolve(res);
    });
  });
}
getSlotsDatewise(username,date){
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/api/slots/u/${username}`;
    this.http.post(url,{date:date}, httpOptions).subscribe((res:any) => {
      if (res.status == SUCCESS) {
        resolve(res.data);
      }else{
        resolve(null);
      }
      // resolve(res);
    });
  });
}
getUsers(pid){
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/api/users/p/${pid}`;
    this.http.get(url, httpOptions).subscribe((res:any) => {
      if (res.status == SUCCESS) {
        resolve(res.data);
      }
      // resolve(res);
    });
  });
}
getTemprature(lat,lon){

  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/api/weather/${lat}/${lon}`
    this.http.get(url, httpOptions).subscribe((res:any) => {
      if (res.status == SUCCESS) {
        resolve(res);
      }
      // resolve(res);
    });
  });
}
saveForm(details) {
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = this.apiRoot + '/api/forms/'+this.project ;
    this.http.post(url, details, httpOptions).subscribe(res => {
      resolve(res);
    });
  });
 }
 isUserRegistered(){
  return new Promise((resolve, reject) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = `${this.apiRoot}/chkusr` ;
    this.http.get(url, httpOptions).subscribe((res:any) => {
      if(res && res.data == '0'){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  });
 }
}
