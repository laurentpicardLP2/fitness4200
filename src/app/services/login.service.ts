import { BookingService } from './booking.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CommandService} from './command.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private commandService: CommandService,
              private bookingService: BookingService) { }

  public isUserLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsUserLoggedSubject(value: boolean){
    if(value){
      this.isUserLoggedSubject.next(value);
    } else {
      this.isUserLoggedSubject.next(null);
    }
  }

  public usernameSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  public setUsernameSubject(value: string){
    if(value){
      this.usernameSubject.next(value);
    } else {
      this.usernameSubject.next(null);
    }
  }

  public signIn(user: User){
    
    this.httpClient.post<User>('http://localhost:8080/userctrl/login', user).subscribe(
        (user) =>{  this.setIsUserLoggedSubject(true); 
                    this.commandService.initCommand(user); 
                    this.setUsernameSubject(user.username);
                    this.bookingService.setListCommandItemsSubject(null);
                    console.log("login user OK : ", user);
        },
        (error) => { console.log("login user pb : ", error); this.setIsUserLoggedSubject(false); }
    );
  }

}
