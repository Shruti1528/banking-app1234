import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
      
  }
  internetBankingForm = new FormGroup({
    AccountNumber: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.email, Validators.required]),
    pwd: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
    cpwd: new FormControl(''),
  });

  internetSubmit(){
    if(this.pwd.value == this.cpwd.value){
      console.log(this.internetBankingForm.valid);
      this.repeatpass = 'none';

      this.authService.registerInternetBanking([
        this.internetBankingForm.value.AccountNumber,
        this.internetBankingForm.value.Email,
        this.internetBankingForm.value.pwd
      ]).subscribe(res=> {
        if(res == 'Success'){
          this.displaymsg = 'Registered for Internet Banking';
          this.isInternetCreated = true;
        }
        else if(res == 'Email not matched'){
          this.displaymsg = 'Email not found in database';
          this.isInternetCreated = false;
        }
        else{
          this.displaymsg = 'Something went wrong';
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
}


