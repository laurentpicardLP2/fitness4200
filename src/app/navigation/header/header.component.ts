import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nbItems: string;

  @Output() public sidenavToggle = new EventEmitter();
  isAuth: boolean;
  public command: Command;
  public listCommandItems: Item []=[];
  

  constructor(private loginService: LoginService,
              private commandService: CommandService,
              private bookingService: BookingService) { }

  ngOnInit(){
    this.loginService.isUserLoggedSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    }); 
    
    this.loginService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.bookingService.listCommandItemsSubject.subscribe(res => {
      this.listCommandItems = res;
    });
  }
 

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onToggleCart(){
    
    //document.getElementById("cart").style.display = "block";
    var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  }

}


  
