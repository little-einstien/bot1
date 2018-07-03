import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as M from 'materialize-css';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DialogflowService } from '../../services/dialogflow.service';
import { WindowRef } from '../../WindowRef';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {
  data: any[] = [];
  tandcurl = `${environment.api_endpoint}/downloadtandc`;
  tandc;
  @Output() sendMessage: EventEmitter<any> = new EventEmitter();
  public mslots;
  public eslots;
  public selectedSlot;
  public event = {
    st: '', et: '', title: '', remarks: '', pid: '', ap_with: "Arnav", details: [],
    "user": { "id": "ww", "name": "gdfgd" }
  };
  public name;
  public mobile;
  public email;
  public st;
  public remarks;
  public pmode;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM  DD YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday  
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'width': '100%' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  @ViewChild('sdate') sdate: ElementRef;
  @ViewChild('stime') stime: ElementRef;
  @ViewChild('edate') edate: ElementRef;
  @ViewChild('etime') etime: ElementRef;
  @Input('response') response: any;
  constructor(private dataHandlerService: DialogflowService, private windowRef: WindowRef) {
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
    setTimeout(() => { this.windowRef.nativeWindow.initStepper(); console.log(this) }, 1000)

  }
  saveEvent() {
  }
  saveAppointment() {
    let pid = '';
    // this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    this.dataHandlerService.saveAppointment({
      pid: "f7W18EB",
      date: this.st.getTime(),
      slot: this.selectedSlot,
      remarks: this.remarks,
      pmode: this.pmode,
      "user": { "id": "ww", "name": this.name, "mobile": this.mobile, "email": this.email }
    }).then((res) => {
      this.sendMessage.emit(res);
    });
  }
  getSlots() {
    console.log(this.st)
    this.dataHandlerService.getSlotsDatewise('arnav', this.st.getTime()).then((slots: any) => {
      if (slots && slots.length != 0) {
        this.mslots = slots[0]['m_slt'];
        this.eslots = slots[0]['e_slt'];
      } else {
        this.mslots = [];
        this.eslots = [];
      }

    });
  }
  onSelectionChange(slot) {
    this.selectedSlot = slot;
    //alert(slot);
  }
  tandcframesrc = '';
  validate() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    var mobilere = /^\d{10}$/;
    return ((!this.name || !this.mobile) || (this.email && !re.test(this.email)) || (!this.pmode) || (this.mobile && !mobilere.test(this.mobile)));
  }
  moveToPaymentSite() {
    this.windowRef.nativeWindow.top.location.href = 'http://drgeetagera.com';
  }

  getTimeLabel() {
    if (this.selectedSlot && this.selectedSlot.l) {
      let date = new Date(this.st.getTime());
      let hrs_mins = this.selectedSlot.l.split(":");
      date.setHours(hrs_mins[0]);
      date.setMinutes(hrs_mins[1]);
      return date.toDateString();
    } else {
      return '';
    }
  }
  downloadTandC() {
    this.tandcframesrc = "35.200.198.3/assets/doc/Appointments.docx";
  }
}
