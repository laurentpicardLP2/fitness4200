import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seance-booking',
  templateUrl: './seance-booking.component.html',
  styleUrls: ['./seance-booking.component.css']
})
export class SeanceBookingComponent implements OnInit {
  seanceBookingForm: FormGroup;
  timeOfBooking: Date;
  strTimeOfBooking: string;
  currentMinute: number;
  shownMinute: string;
  selectedSlice: string;
  currentHour: number;
  shownHour: string;
  selectedHour: string;
  strDateOfBooking: string;
  dateOfBooking: Date;
  shownYear: string;
  selectedYear: string;
  currentMonth: number;
  shownMonth: string;
  selectedMonth: string;
  currentDay: number;
  shownDay: string;
  selectedDay: string;
  selectedConcatFields: string;
  isOpen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookingService: BookingService) {
      this.createForm();
      this.isOpen = true;
      this.initDateBookingField();
      this.initTimeBookingField();
      this.routingInit();
      this.bookingService = bookingService;
   }

  ngOnInit() {
    
  }

  public onShowTime(){
    let field = this.strTimeOfBooking.split(":");
    let hh = field[0];
    let hhInt = parseInt(hh, 10);
    if(hhInt < this.currentHour ) {
      //this.isOpen = false;
    }
    else {
      this.isOpen = true;
    }
  }

  createForm(){
    this.seanceBookingForm = this.formBuilder.group({
      dateOfBooking: ['', [
        Validators.required
    ]],
      timeOfBooking: ['', [
        Validators.required
    ]]
    });      
  }

  initDateBookingField(){
    this.dateOfBooking = new Date();

    this.shownYear = this.dateOfBooking.getFullYear().toString();
    this.currentMonth = this.dateOfBooking.getMonth() + 1;
    this.currentDay = this.dateOfBooking.getDate()
    
    if(this.currentMonth <10) {
      this.shownMonth = "0" + this.currentMonth.toString();
    } else{
      this.shownMonth = this.currentMonth.toString();
    }
    if(this.currentDay < 10) {
      this.shownDay = "0" + this.currentDay.toString();
    } else{
      this.shownDay = this.currentDay.toString();
    }
    
    this.strDateOfBooking = this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
  }

  initTimeBookingField(){
    this.timeOfBooking = new Date();

    
    this.currentHour = this.timeOfBooking.getHours();
    if(this.currentHour < 6) {
      this.shownHour="06";
    } else if(this.currentHour < 10) {
      this.shownHour = "0" + this.currentHour.toString();
    } else if(this.currentHour < 22) {
      this.shownHour = this.currentHour.toString();
      //else passer à la journée suivante
    }
    
    this.currentMinute = this.timeOfBooking.getMinutes();
    this.isOpen = true;
     if (this.currentMinute < 10){
      this.shownMinute = "10";
    } else if(this.currentMinute < 20 ) {
      this.shownMinute = "20";
    } else if(this.currentMinute < 30 ) {
      this.shownMinute = "30";
    } else if(this.currentMinute < 40 ) {
      this.shownMinute = "40";
    } else if(this.currentMinute < 50 ) {
      this.shownMinute = "50";
    } else {
      this.shownMinute = "00";
      this.shownHour = (this.currentHour + 1).toString();
    }
    //else passer à la journée suivante
    
   this.strTimeOfBooking = this.shownHour + ":" + this.shownMinute;

  ;
  }

  routingInit(){
    this.bookingService.setTimestampSubject(this.getDateTimeFields());
    //this.router.navigate(['/seance-booking', {outlets: {'booking-router-outlet' : ['facility-category-booking']}}]);
  }

  public onChangeDateTime() {
    this.bookingService.setTimestampSubject(this.getDateTimeFields());
    this.router.navigate(['/seance-booking', {outlets: {'facility-category-router-outlet' : ['facility-category-booking']}}]);
  }

  getDateTimeFields(){
    this.selectedConcatFields = "";
    let dateFieldsSplit = this.strDateOfBooking.split("-");
    let timeFieldsSplit = this.strTimeOfBooking.split(":");

    return dateFieldsSplit[0] + "_" + dateFieldsSplit[1] + "_" +dateFieldsSplit[2] + "_" + 
    timeFieldsSplit[0] + "_" + (Math.floor(parseInt(timeFieldsSplit[1],10)/10)).toString();
  }
  
}