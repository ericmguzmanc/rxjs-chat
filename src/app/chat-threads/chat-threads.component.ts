import { 
  Component,
  OnInit,
  Inject } from '@angular/core';

  import { Observable } from 'rxjs';
  import { Thread } from '../thread/thread.model';
  import { ThreadsService } from '../thread/thread.service';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<any>;

  constructor(public threadService: ThreadsService) { 
    this.threads = threadService.orderedThreads;
  }

  ngOnInit() {
  }

}
