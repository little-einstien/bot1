import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service'
@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  constructor(private dialogFlowService: DialogflowService) { }
  @Input('message')
  private message : Message;
  @Input('props')
  private props ;

  @Input('messages')
  private messages : Message[] = [];

  ngOnInit() {
    //this.message = {'content':''};
    //this.messages =[];

  }


  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.dialogFlowService.getResponse(this.message.content).then((res:any) => {
      console.log(res);
      this.messages.push(
        new Message(res['resp'][0]  , 'assets/images/bot.png', 'bot',res.timestamp)
      );
    });
    console.log(this.messages);
    this.message = new Message('', 'assets/images/user.png','user');
}
onKeydown(event) {
  if (event.key === "Enter") {
    this.sendMessage();
    console.log(event);
  }
}

}
