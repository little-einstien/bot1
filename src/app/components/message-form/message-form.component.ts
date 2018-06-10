import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service'
import { SpeechService } from '../../services/speech.service';
import { ScrollbarComponent } from 'ngx-scrollbar';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Input("scroll") scrollRef: ScrollbarComponent;
  constructor(private dialogFlowService: DialogflowService,private  speech : SpeechService ) { }
  @Input('message')
  public  message : Message;
  @Input('props')
  public props ;
  @Input('botinit')
  public botinit ;

  @Input('messages')
  public messages : Message[] = [];

  ngOnInit() {
    console.log(this.botinit)
    //this.message = {'content':''};
    //this.messages =[];

  }
  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.dialogFlowService.getResponse(this.message,this.botinit).then((res:any) => {
      console.log(res);
      this.messages.push(
        new Message({txt : res['res'][0],type:1,children : []}  , 'assets/images/bot.png', 'bot',res.timestamp)
      );
      this.speech.speak(res['res'][0]);
    });
    console.log(this.messages);
    this.message = new Message({txt: '',type:1 ,children : []}, 'assets/images/user.png','user');
    setTimeout(() => {this.scrollRef['directiveRef'].scrollToBottom()},500);
}
onKeydown(event) {
  if (event.key === "Enter") {
    this.sendMessage();
    console.log(event);
  }
}
listen(speakBtn){
  this.speech.listen();
  speakBtn.classList.add('pulse')
}

}
