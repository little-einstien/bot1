import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../../services/dialogflow.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public email = '';
  public name = '';
  public mobile = '';

  constructor(private dataHandlerService : DialogflowService) { }

  ngOnInit() {
  }
  register(){
    this.dataHandlerService.registerUser({'name':this.name,'email':this.email,'mobile':this.mobile}).then(data => {
      alert(data);
    });
  }
  validate(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    return ((!this.name || !this.email || this.mobile) || (this.email && !re.test(this.email)));
  }

}
