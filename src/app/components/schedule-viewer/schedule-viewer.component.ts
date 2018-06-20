import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css']
})
export class ScheduleViewerComponent implements OnInit, AfterViewInit {
  @Input("data") data;
  ngAfterViewInit(): void {
    var instances = M.Modal.init(document.querySelectorAll('.modal'), {});
  }

  constructor() { }

  ngOnInit() {
  }

}
