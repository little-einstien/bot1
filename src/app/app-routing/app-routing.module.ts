import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { BotComponent } from '../components/bot/bot.component';


const routes : Routes = [
  {path:'project/:project',component:BotComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ enableTracing: false ,onSameUrlNavigation: 'reload'})
  ],
  exports:[RouterModule],
  declarations: [],
  providers:[]
})
export class AppRoutingModule { }
export const routingComponents = [BotComponent]
