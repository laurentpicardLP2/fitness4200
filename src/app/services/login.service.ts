import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CommandService} from './command.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private commandService: CommandService) { }

  public loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setLoginSubject(value: boolean){
    if(value){
      this.loginSubject.next(value);
    } else {
      this.loginSubject.next(null);
    }
  }

  public signIn(user: User){
    
    this.httpClient.post<User>('http://localhost:8080/userctrl/login', user).subscribe(
        (user) =>{  this.setLoginSubject(true); this.commandService.initCommand(user); console.log("login user OK : ", user);},
        (error) => { console.log("login user pb : ", error); this.setLoginSubject(false); }
    );
  }

}
