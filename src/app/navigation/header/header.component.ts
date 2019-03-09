import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  isAuth: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit(){
    this.loginService.loginSubject.subscribe(res => {
      this.isAuth = res;
    });
  }
 

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}


  
