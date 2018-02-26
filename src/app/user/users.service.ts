import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Subject';
import { User } from './user.model';

@Injectable()
export class UsersService {
  // `currentUser` contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);
}