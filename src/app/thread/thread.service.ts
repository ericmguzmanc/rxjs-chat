import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread } from './thread.model';
import { Message } from './../message/message.model';
import { MessagesService } from './../message/message.service';
import * as _ from 'lodash';

@Injectable()
export class ThreadsService {

  //`threads` is an observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;

  //`currentThread` contains the currently selected thread
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  constructor(public messagesServices: MessagesService){
    this.threads = messagesServices.messages
      .map( (messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        //Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
          const messagesThread: Thread = threads[message.thread.id];
          if(!messagesThread.lastMessage ||
              messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      });

    this.currentThread.subscribe(this.messagesServices.markThreadAsRead);
    
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }

}