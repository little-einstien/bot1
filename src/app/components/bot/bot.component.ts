import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  public type: string = 'component';
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  public message: Message = new Message({txt:'',type:0}, 'assets/images/user.png', 'user', new Date());;
  
  public messages: Message[] = [
    new Message({txt: 'Welcome i am your assitant',type:0}, 'assets/images/bot.png', 'bot', new Date())
  ];
  public botint: boolean;
  public flow;

  props = {
    bg_clr: "green",
    h_clr:'green',
    bcb_clr: "blue",
    ucb_clr: "grey",
    header:'green',
    form_bg_clr:'white'
  };
  botinit = { val: 'hfjhg' };
  ngOnInit(): void {

  }
  public project ;
  constructor(private route: ActivatedRoute, private dialogflowService: DialogflowService) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.project) {
        this.dialogflowService.project = params.project;
        this.dialogflowService.getProjectDetails(params.project).then((proj) =>{
              this.project = proj;
              this.props.bg_clr = proj['bg_clr'];
              this.props.h_clr= proj['h_clr'];
              this.props.ucb_clr = proj['ucb_clr'];
              this.props.bcb_clr = proj['bcb_clr'];
              this.props.header = proj['header'];
              this.dialogflowService.getFlow(params.project).then((flow) => {
                this.flow = flow['flow'];
                if (flow['sp']) {
                  let startingNode = flow['sp'];
                  this.message = new Message({txt:'',type:0}, 'assets/images/user.png', 'user', new Date());
                  this.messages = [ 
                    new Message({txt : this.flow.nodes[startingNode].label,type:2,children : this.getChildren(startingNode,this.flow.edges)}, 'assets/images/bot.png', 'bot', new Date())
                  ];
                }
              }).catch((err) => {
                  console.log(err);
              });
        });
      }
    });
  }
  close() {
    window.parent.postMessage('message', '*');
  }
  
  getChildren(parent,data){
    let to = [];
    for (let _i = 0; _i < data.length; _i++) {
      if(data[_i].from == parent){
        to.push({id : data[_i].to ,  txt : this.flow.nodes[data[_i].to].as_btn ? this.flow.nodes[data[_i].to].btn_txt : this.flow.nodes[data[_i].to].label,
          txt_color : this.flow.nodes[data[_i].to].txt_color,
          color : this.flow.nodes[data[_i].to].color,
          as_btn : this.flow.nodes[data[_i].to].as_btn
        } );
      }
    }
    return to;
  }
  getResponse($event){
    let txt = this.flow.nodes[$event].label;
    let children  =  this.getChildren($event,this.flow.edges);
    let type = children && children.length != 0 ? 2 : 1;
    this.messages.push( 
      new Message({txt : txt,type:type,children:children}, 'assets/images/bot.png', 'bot', new Date())
    );
    console.log($event);
    setTimeout(()=>{ this.scrollToBottom()},250);
  }
  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }
}
