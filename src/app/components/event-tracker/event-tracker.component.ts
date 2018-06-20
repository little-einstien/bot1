import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as M from 'materialize-css';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DialogflowService } from '../../services/dialogflow.service';
import { WindowRef } from '../../WindowRef';
@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {
  data:any[] = [];
  public event = {st:'',et:'',title:'',remarks:'',pid:'',ap_with: "Arnav",details:[],
  "user": { "id": "ww", "name": "gdfgd" }};
  
  @ViewChild('sdate') sdate: ElementRef;
  @ViewChild('stime') stime: ElementRef;
  @ViewChild('edate') edate: ElementRef;
  @ViewChild('etime') etime: ElementRef;
  @Input('response') response:any ;
  constructor(private dataHandlerService: DialogflowService,private windowRef : WindowRef) {
    setTimeout(() => {
      M.Datepicker.init(document.querySelectorAll('.datepicker'), {});
      M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
    }, 1000);
  }

  ngOnInit() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
    setTimeout(()=> {this.windowRef.nativeWindow.initStepper();console.log(this)},1000)

  }
  saveEvent() {
    
    let startDate = M.Datepicker.getInstance(this.sdate.nativeElement);
    let startTime = M.Timepicker.getInstance(this.stime.nativeElement);
    let endDate = M.Datepicker.getInstance(this.edate.nativeElement);
    let endTime = M.Timepicker.getInstance(this.etime.nativeElement);

    startDate.date.setHours(startTime.hours);
    startDate.date.setMinutes(startTime.minutes);

    endDate.date.setHours(endTime.hours);
    endDate.date.setMinutes(endTime.minutes);
    this.event.st = startDate.date.toISOString();
    this.event.et = endDate.date.toISOString();;

    let pid = '131d3w2d';
    // this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    this.event.pid = pid;
    this.dataHandlerService.saveAppointment(this.event);
    console.log(event);
  }

  
}
