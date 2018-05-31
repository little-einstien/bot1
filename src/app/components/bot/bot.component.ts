import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  props = {
    background:"light green",
    message_form:{background:"white"},
    bot_color:"red-text",
    user_color:" pink-text text-darken-4",
  };
  botinit = {val:'hfjhg'};
  ngOnInit(): void {
    
  }
  public message : Message;
  public messages : Message[];

  constructor(private route: ActivatedRoute,private dialogflowService: DialogflowService) {
    this.route.params.subscribe( params => {
      console.log(params);
      if(params.project){
        this.dialogflowService.project = params.project;
      }
    });
    this.message = new Message('', 'assets/images/user.png','user');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png','bot', new Date())
    ];
  }
}
