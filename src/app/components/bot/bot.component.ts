import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { DOCUMENT } from '@angular/platform-browser';
import { WindowRef } from '../../WindowRef';
@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit, AfterViewInit {

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  public type: string = 'component';
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  public message: Message = new Message({ txt: '', type: 0 }, 'assets/images/user.png', 'user', new Date());;

  public messages: Message[] = [];
  public botint: boolean;
  public flow;

  props = {
    bg_clr: "green",
    h_clr: 'green',
    bcb_clr: "blue",
    ucb_clr: "grey",
    header: 'green',
    form_bg_clr: 'white'
  };
  botinit = { val: 'hfjhg' };
  ngOnInit(): void {

  }
  public project;

  constructor(private route: ActivatedRoute,
    private dialogflowService: DialogflowService,
    private windowRef: WindowRef) {

  }
  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.project) {
        this.dialogflowService.project = params.project;
        this.messages.push(
          new Message({ txt: 'Welcome To DR. GEETA GERA (SKIN, HAIR & LASER CLINIC). I am Duffy, your AI experience assitant.', type: 0 }, 'assets/images/bot.png', 'bot', new Date())
        );
        this.wetherMessage().then(() => {
          this.dialogflowService.getProjectDetails(params.project).then((proj) => {
            this.project = proj;
            this.props.bg_clr = proj['bg_clr'];
            this.props.h_clr = proj['h_clr'];
            this.props.ucb_clr = proj['ucb_clr'];
            this.props.bcb_clr = proj['bcb_clr'];
            this.props.header = proj['header'];
            this.dialogflowService.getFlow(params.project).then((flow) => {
              this.flow = flow['flow'];
              if (flow['sp']) {
                let startingNode = flow['sp'];
                this.message = new Message({ txt: '', type: 0 }, 'assets/images/user.png', 'user', new Date());

                setTimeout(() => {
                  this.messages.push(
                    new Message({ txt: this.flow.nodes[startingNode].label, type: 2, children: this.getChildren(startingNode, this.flow.edges) }, 'assets/images/bot.png', 'bot', new Date())
                  );
                  // setTimeout(() => { this.scrollToBottom() }, 250);
                }, 1000);

              }
            }).catch((err) => {
              console.log(err);
            });
          });
        });
      }
    });
  }
  close() {
    window.parent.postMessage('message', '*');
  }

  getChildren(parent, data) {
    let to = [];
    for (let _i = 0; _i < data.length; _i++) {
      if (data[_i].from == parent) {
        to.push({
          id: data[_i].to, txt: this.flow.nodes[data[_i].to].as_btn ? this.flow.nodes[data[_i].to].btn_txt : this.flow.nodes[data[_i].to].label,
          txt_color: this.flow.nodes[data[_i].to].txt_color,
          color: this.flow.nodes[data[_i].to].color,
          as_btn: this.flow.nodes[data[_i].to].as_btn
        });
      }
    }
    return to;
  }
  getResponse($event) {

    if (this.flow.nodes[$event]) {
      this.messages.push(
        new Message({ txt: `You have selected ${this.flow.nodes[$event].btn_txt}`, type: 0 }, 'assets/images/user.png', 'user', new Date())
      );
    }
    if ($event == 'form') {
      this.messages.push(
        new Message({ txt: `Thanks for sharing the details. This is a common problem these days. Don't worry, You can book an appointment and visit the clinic for the treatment.`, type: 0 }, 'assets/images/bot.png', 'bot', new Date())
      );
      setTimeout(() => { this.scrollToBottom() }, 250);
      return;
    }
    let txt = this.flow.nodes[$event].label;
    //let txt = this.flow.nodes[$event].label;
    let children = this.getChildren($event, this.flow.edges);
    let type = children && children.length != 0 ? 2 : 1;
    if ($event == "2c25e2d1-a17a-4915-988b-4b224bfa94f4") type = 3;
    if ($event == "e645dbbd-dbcc-45b2-904f-b0cb9559b628") {
      type = 4
      txt = {
        for: 'Skin problems',
        title: 'Thanks, Could you share the details below further?', data: [
          { t: "i", ph: "What is your age", value: "" },
          { t: 'r', name: "sex", label: 'What is your gender', l: [{ label: "Male", value: "" }, { label: "Female", value: "" }] },
          { t: "i", ph: "Since When you are facing this", value: "" },
          { t: 'cb', name: "s1", l: [{ label: "Does it itches as well ?", value: "" }] },
          { t: "ta", ph: "More Details about the allergy", value: "" },
          { t: "btn", label: 'Submit' }
        ]
      }
    }
    if ($event == "1433143d-7ecd-4d99-8b55-a43833f35ea6") {
      type = 4
      txt = {
        for: 'Hair loss',
        title: 'Thanks, Could you share the details below further?', data: [
          { t: "i", ph: "Your good Name", value: "" },
          { t: "i", ph: "What is your age", value: "" },
          { t: 'cb', name: "problem", label: "What is your problem ?", l: [{ label: "Hair Loss", value: "" }, { label: "Hair Thining", value: "" }, { label: "Hair Fall", value: "" }, { label: "Dandruff", value: "" }] },
          { t: "i", ph: "Since When you are facing this", value: "" },
          { t: "i", ph: "Do you have a family history either on paternal or maternal side ? ", value: "" },
          { t: "i", ph: "Have you taken any treatment before ? ", value: "" },
          { t: "i", ph: "Are you on any other medications like thyroid,BP,sugar/ any supplements", value: "" },
          { t: "ta", ph: "Tell me about your life style", value: "" },
          { t: "l", txt: 'Your doctor will like to analyse your scalp,kind of hair loss , dandruff etc along with few blood tests wwill be advise of', value: "" },
          { t: "btn", label: 'Proceed' }
        ]
      }
    }
    this.messages.push(
      new Message({ txt: txt, type: type, children: children }, 'assets/images/bot.png', 'bot', new Date())
    );
    console.log($event);
    setTimeout(() => { this.scrollToBottom() }, 250);
  }
  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }
  wetherMessage() {
    return new Promise((resolve, reject) => {
      this.dialogflowService.getTemprature(-1, -1).then((data: any) => {
        setTimeout(() => {
          this.messages.push(new Message({
            txt: `
          <p>You know todays temperature in ${data.data.name}  is <span><b>${data.data.main.temp - 273.15} <sup >C</sup></b></span>
          please take care of your Head and Skin as it is ${data.data.weather[0].description} outside</p>
          `, type: 0
          }, 'assets/images/bot.png', 'bot', new Date()))
          console.log(data.data.name)
        }, 500)
        // setTimeout(() => {this.messages.push(new Message({
        //   txt: 'Tell me how can i help you today ?', type: 0
        // }, 'assets/images/bot.png', 'bot', new Date()))}, 700);
        resolve();
      })

      //     if (navigator.geolocation) {
      //       navigator.geolocation.getCurrentPosition((position) => {
      //         let lat = position.coords.latitude;
      //         let lon = position.coords.longitude;
      //         this.dialogflowService.getTemprature(lat, lon).then((data: any) => {
      //           this.messages.push(new Message({
      //             txt: `
      //           <h4>Hey todays temperature in ${data.data.name} is ${data.data.main.temp - 273.15} </h4>
      //           <h5>please take care of your head and skin as it is ${data.data.weather[0].description} outside</h5>
      //           `, type: 0
      //           }, 'assets/images/bot.png', 'bot', new Date()))
      //           console.log(data.data.name)
      //         })
      //       }, (err) => {
      //         console.log(err);
      //       });
      //     } else {
      //       alert("Geolocation is not supported by this browser.");
      //     }
    });
  }
  goToUrl(): void {
    this.windowRef.nativeWindow.top.location.href = 'http://ailifebot.com';
  }
  sendMsg($event) {
    alert('called');
    console.log($event);
    this.messages[this.messages.length-1] = new Message({
      txt: `Your appointment has been submitted to Doctor. Your Booking id is  ${$event.id}<p>asada</p>`, type: 0
    }, 'assets/images/bot.png', 'bot', new Date());
  }
}
