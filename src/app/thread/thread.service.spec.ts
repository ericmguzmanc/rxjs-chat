import { Message } from './../message/message.model';
import { Thread } from './thread.model';
import { User } from './../user/user.model';

import { ThreadsService } from './thread.service';
import { MessagesService } from './../message/message.service';
import * as _ from 'lodash';

describe('ThreadsService', () => {
  it('should collect the Threads from messages', () => {
    const nate: User = new User('Nate Nurray', '');
    const felipe: User = new User('Felipe Coury', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: Message = new Message({
      author: nate,
      text: 'Hi!',
      thread: t1
    });
    const m2: Message = new Message({
      author: felipe,
      text: 'Where did you get that hat!',
      thread: t1
    });
    const m3: Message = new Message({
      author: nate,
      text: 'Did you bring your briefcase',
      thread: t2
    });

    const messagesService: MessagesService = new MessagesService();
    const threadsService: ThreadsService = new ThreadsService(messagesService);
    
    threadsService.threads
      .subscribe( (threadIdx: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadIdx);
        const threadNames: string = _.map(threads, (t: Thread) => t.name).join(', ');

        console.log(`=> threads (${threads.length}): ${threadNames} `);
      });
    
      messagesService.addMessage(m1);
      messagesService.addMessage(m2);
      messagesService.addMessage(m3);

      threadsService.orderedThreads
        .subscribe( (threads: Thread[]) => {
          console.log('en el test ', _.values(threads));
        })

  });
});