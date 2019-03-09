import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User;

  constructor(private router: Router,
              private httpClient: HttpClient) { }

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
        (user) =>{ console.log("login user OK : ", user); this.setLoginSubject(true);  this.router.navigate(['']);},
        (error) => { console.log("login user pb : ", error); this.setLoginSubject(false); }
    );
  }
  
  public getUser(){
    return this.user;
  }

}
