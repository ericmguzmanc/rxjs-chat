import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
