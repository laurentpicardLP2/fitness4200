import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { CustomerService } from '../services/customer.service';
import { Customer } from './../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})



export class CustomerNewComponent implements OnInit {
  newCustomer: Customer;
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  fullName: string; 
  username: string;
  email: string;
  password: string;
  checkedAdrCopy: boolean;
  dateOfBirthday: Date;
  domesticAddress: string;
  domesticCp: string;
  domesticCity: string;
  domesticCountry: string;
  deliveryAddress: string;
  deliveryCp: string;
  deliveryCity: string;
  deliveryCountry: string;
  tel: string;
 

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private httpClient: HttpClient
) {
    this.createForm();
}


  ngOnInit() {
    this.customerService.publishAuthorities();
    this.checkedAdrCopy = false;
  }

  createForm() {
      this.userRegistrationForm = this.formBuilder.group({
          fullName: ['', [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(128)
          ]],
          usernameGroup: this.formBuilder.group({
          username: ['', [
            Validators.required,
            Validators.minLength(1),
          ]]
        }, {validator: this.checkUsername.bind(this)}),
        emailGroup: this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            confirmEmail: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        passwordGroup: this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.pattern(regExps.password)
            ]],
            confirmPassword: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        domesticAddress: ['', [
            Validators.required
        ]],
        domesticCity: ['', [
            Validators.required
        ]],
        domesticCp: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5)
        ]],
        domesticCountry: ['', [
            Validators.required
        ]],
        checkedAdr: [true],
        deliveryAddress: ['', [
            Validators.required
        ]],
        deliveryCity: ['', [
            Validators.required
        ]],
        deliveryCp: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5)
        ]],
        deliveryCountry: ['', [
            Validators.required
        ]],
        tel: ['', [
            Validators.required
        ]],
        dateOfBirthday: ['', [
            Validators.required
        ]]
      });
  }

  onCopyAdr(){
      if(!this.checkedAdrCopy){
        this.deliveryAddress = this.domesticAddress;
        this.deliveryCp = this.domesticCp;
        this.deliveryCity = this.domesticCity;
        this.deliveryCountry = this.domesticCountry;
      }
      else {
        this.deliveryAddress="";
        this.deliveryCp = "";
        this.deliveryCity = "";
        this.deliveryCountry = "";
      }
      
  }

  register(): void {
      this.newCustomer = new Customer(
                this.username,
                this.fullName,  
                this.password,
                this.email,
                this.tel, 
                this.dateOfBirthday, 
                this.domesticAddress,
                this.domesticCp,
                this.domesticCity,
                this.domesticCountry,
                this.deliveryAddress,
                this.deliveryCp,
                this.deliveryCity,
                this.deliveryCountry,
                );

    this.httpClient.post<Customer>('http://localhost:8080/userctrl/newcustomer', this.newCustomer).subscribe(
        (newUsers) =>{ console.log("création user OK : ", newUsers); this.router.navigate(['']);},
        (error) => console.log("création user pb : ", error) 
    );
 }

  checkUsername(group: FormGroup){
    let username : string;
    
    username = group.get("username").value;
    const isValid = !(this.customerService.availableAuthorities.find(authoritary => authoritary.username === username))
    return isValid ? null : { checkUsername: true };
  }
}