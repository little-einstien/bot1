import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BotComponent } from './components/bot/bot.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { RegistrationStepperComponent } from './components/registration-stepper/registration-stepper.component';
import { EventTrackerComponent } from './components/event-tracker/event-tracker.component';
import { ScheduleViewerComponent } from './components/schedule-viewer/schedule-viewer.component';
import { WindowRef } from './WindowRef';
import { NgDatepickerModule } from 'ng2-datepicker';
import { StpperFormComponent } from './components/stpper-form/stpper-form.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent, MessageFormComponent,RegistrationStepperComponent, MessageItemComponent, MessageListComponent, routingComponents, BotComponent, EventTrackerComponent, ScheduleViewerComponent, StpperFormComponent, RegistrationComponent

  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, PerfectScrollbarModule,NgDatepickerModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  } ,WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
