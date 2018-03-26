import { Component, Inject } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';

import { UsersService } from './user/users.service';
import { ThreadsService } from './thread/thread.service';
import { MessagesService } from './message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public messagesService: MessagesService,
              public threadService: ThreadsService,
              public userService: UsersService) {
    ChatExampleData.init(messagesService, threadService, userService);
  }
}
