import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-seance-booking',
  templateUrl: './seance-booking.component.html',
  styleUrls: ['./seance-booking.component.css']
})
export class SeanceBookingComponent implements OnInit {
  seanceBookingForm: FormGroup;
  timeOfBooking: Date;
  strDateOfBooking: string;
  dateOfBooking: Date;


  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.dateOfBooking = new Date();
    
    let yyyy = this.dateOfBooking.getFullYear().toString();
    let mm;
    let dd;
    if(this.dateOfBooking.getMonth() + 1 <10) {
      mm = "0" + (this.dateOfBooking.getMonth() + 1).toString();
    } else{
      mm = (this.dateOfBooking.getMonth() + 1).toString();
    }
    if(this.dateOfBooking.getDate() < 10) {
      dd = "0" + this.dateOfBooking.getDate().toString();
    } else{
      dd = this.dateOfBooking.getDate().toString();
    }
    
    this.strDateOfBooking = yyyy + "-" + mm + "-" + dd;
    console.log(dd)
    // this.strDateOfBooking = yyyy + "-0" + mm + "-0" + dd;
    // console.log(this.strDateOfBooking );
  }

  public onShowTime(){
    console.log(this.timeOfBooking);
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

  
}
