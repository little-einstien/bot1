import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as M from 'materialize-css';
import { DialogflowService } from '../../services/dialogflow.service';
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
    let startDate = M.Datepicker.getInstance(this.sdate.nativeElement);
    let startTime = M.Timepicker.getInstance(this.stime.nativeElement);
    let endDate = M.Datepicker.getInstance(this.edate.nativeElement);
    let endTime = M.Timepicker.getInstance(this.etime.nativeElement);

    startDate.date.setHours(startTime.hours);
    startDate.date.setMinutes(startTime.minutes);

    endDate.date.setHours(endTime.hours);
    endDate.date.setMinutes(endTime.minutes);
    let pid = 'dsd';
    //this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    this.dataHandlerService.saveAppointment({
      pid: pid,
      title: this.title,
      remarks: this.remarks,
      st: startDate.date.toISOString(),
      et: endDate.date.toISOString(),
      ap_with: "Arnav",
      "user": { "id": "ww", "name": "gdfgd" }
    });
  }

}
