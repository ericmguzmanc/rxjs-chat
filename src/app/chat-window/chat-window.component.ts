import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../message/message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { MessagesService } from '../message/message.service';
import { ThreadsService } from '../thread/thread.service';
import { UsersService } from '../user/users.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public UserService: UsersService,
              public el: ElementRef) {

  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThread;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.UserService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

}
