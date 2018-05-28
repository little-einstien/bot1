import { Component } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}
}
