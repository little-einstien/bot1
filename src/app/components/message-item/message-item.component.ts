import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Output() responseClick: EventEmitter<any> = new EventEmitter();
  @Output() sendMessage: EventEmitter<any> = new EventEmitter();
  @Input('props')
  public props;
  @Input('message')
  public message: Message;
  constructor() { }
  ngOnInit() { }
  getResponse(id) {
    this.responseClick.emit(id);
  }
  sendMsg(data){
    this.sendMessage.emit(data);
  }
}
