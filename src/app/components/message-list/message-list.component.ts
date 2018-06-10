import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../../models/message';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @Output() responseClick: EventEmitter<any> = new EventEmitter();
  @Input('messages')
  public messages: Message[];
  @Input('props')
  private props ;

  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef }) chatItems: QueryList<MessageItemComponent>;

  constructor() {
    console.log('Hello');
  }

  ngAfterViewInit() {
    console.log('Hello ngAfterViewInit');
    this.chatItems.changes.subscribe(elements => {
       console.log('messsage list changed: ' + this.messages.length);
    });
  }

  ngOnInit() {
  }
  getResponse($event){
    this.responseClick.emit($event);
  }
}
