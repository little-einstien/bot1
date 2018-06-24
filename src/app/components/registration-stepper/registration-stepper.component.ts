import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as M from 'materialize-css';
import { DialogflowService } from '../../services/dialogflow.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})
export class RegistrationStepperComponent implements OnInit {
  public title: string;
  public remarks: string;
  public st: Date;
  public et: Date;
  public name;
  public mobile;
  public email;
  
  @ViewChild('sdate') sdate: ElementRef;
  @ViewChild('stime') stime: ElementRef;
  @ViewChild('edate') edate: ElementRef;
  @ViewChild('etime') etime: ElementRef;

  constructor(private dataHandlerService: DialogflowService) {
    setTimeout(() => {
      M.Datepicker.init(document.querySelectorAll('.datepicker'), {});
      M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
    }, 1000);
  }

  ngOnInit() {
  }
  saveAppointment() {
    let pid = '';
    // this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    // this.dataHandlerService.saveAppointment({
    //   pid: "f7W18EB",
    //   date : this.st.getTime(),
    //   slot:this.selectedSlot,
    //   "user": { "id": "ww", "name": this.name,"mobile":this.mobile,"email":this.email }
    // });
  }
  
}
