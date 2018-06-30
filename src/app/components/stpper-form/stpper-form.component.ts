import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as M from 'materialize-css';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DialogflowService } from '../../services/dialogflow.service';
import { WindowRef } from '../../WindowRef';
import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-stpper-form',
  templateUrl: './stpper-form.component.html',
  styleUrls: ['./stpper-form.component.css']
})
export class StpperFormComponent implements OnInit {
  @Input('data') object: any;


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

}
