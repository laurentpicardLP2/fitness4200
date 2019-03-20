import { Router } from '@angular/router';
import { BookingService } from './booking.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CommandService} from './command.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private commandService: CommandService,
              private bookingService: BookingService,
              private router: Router,
              private token: TokenStorageService) { }

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


    this.attemptAuth(user.username, user.password).subscribe(
      data => {
       
        this.token.saveToken(data.token);
        console.log("data.token", data.token);
        this.setIsUserLoggedSubject(true); 
        this.commandService.initCommand(user); 
        this.setUsernameSubject(user.username);
        this.bookingService.setListCommandItemsSubject(null);
        console.log("login user OK : ", user);
        //console.log("order", this.token.getOrder());
        
        //this.loginService.publishRole()
        //this.router.navigate(['googlebooks']);
      },
      (error) => { console.log("login user pb : ", error); this.setIsUserLoggedSubject(false); 
      //this.loginService.username="anonymous";
        //this.loginService.isAuth = false;
      }
    );
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.httpClient.post('http://localhost:8080/userctrl/login', credentials);
  }


  public signOut(){
    this.setIsUserLoggedSubject(false);
    this.token.signOut();
    this.router.navigate[('/')];
  }

}
