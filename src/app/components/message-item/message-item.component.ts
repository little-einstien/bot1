import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input('props')
  private props ;
  @Input('message')
  private message: Message;
  constructor(){}
  ngOnInit() {}
}
