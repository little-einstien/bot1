import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as M from 'materialize-css';
// import * as $ from 'jquery';
import { DialogflowService } from '../../services/dialogflow.service';
import { WindowRef } from '../../WindowRef';
@Component({
  selector: 'app-stpper-form',
  templateUrl: './stpper-form.component.html',
  styleUrls: ['./stpper-form.component.css']
})
export class StpperFormComponent implements OnInit {
  @Output() responseClick: EventEmitter<any> = new EventEmitter();
  @Input('data') data: any;
  public formData = [];

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
  saveData(){
    console.log(this.data);
    this.dataHandlerService.saveForm(this.data).then(() => {
      this.responseClick.emit('form');
    });
  }

}
