import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BotComponent } from './components/bot/bot.component';
import { ScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  declarations: [
    AppComponent, MessageFormComponent, MessageItemComponent, MessageListComponent,routingComponents, BotComponent

  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,HttpClientModule,ScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
