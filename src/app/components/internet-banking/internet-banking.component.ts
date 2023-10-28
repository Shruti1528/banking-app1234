import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-internet-banking',
  templateUrl: './internet-banking.component.html',
  styleUrls: ['./internet-banking.component.css']
})
export class InternetBankingComponent implements OnInit{
  repeatpass: string = 'none';
  displaymsg: string = '';
  isInternetCreated: boolean = false;
  constructor(private authService: AuthService,private router: Router){

  }
  ngOnInit(): void {
      
  }
  internetBankingForm = new FormGroup({
    AccountNumber: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.email, Validators.required]),
    pwd: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
    cpwd: new FormControl(''),
    otp: new FormControl("",[Validators.minLength(6), Validators.required]),
  });

  internetSubmit(){
    if(this.pwd.value == this.cpwd.value){
      console.log(this.internetBankingForm.valid);
      this.repeatpass = 'none';

      this.authService.registerInternetBanking([
        this.internetBankingForm.value.AccountNumber,
        this.internetBankingForm.value.Email,
        this.internetBankingForm.value.pwd,
        this.internetBankingForm.value.otp
      ]).subscribe(res=> {
        if(res == 'Success'){
          this.displaymsg = 'Registered for Internet Banking';
          this.isInternetCreated = true;
          this.router.navigate(['/login']);
        }
        else if(res == 'Email not matched'){
          this.displaymsg = 'Email not found in database';
          alert('Email not found in database');
          this.isInternetCreated = false;
        }
        else{
          this.displaymsg = 'Something went wrong';
          alert('Something went wrong');
          this.isInternetCreated = false;
        }
      })
    }else{
      this.repeatpass = 'inline'
    }
    
  }
  get AccountNumber(): FormControl{
    return this.internetBankingForm.get("AccountNumber") as FormControl;
  }
  get Email(): FormControl{
    return this.internetBankingForm.get("Email") as FormControl;
  }
  get pwd(): FormControl{
    return this.internetBankingForm.get("pwd") as FormControl;
  }
  get cpwd(): FormControl{
    return this.internetBankingForm.get("cpwd") as FormControl;
  }
  get otp(): FormControl{
    return this.internetBankingForm.get("otp")  as FormControl;
  }
}


