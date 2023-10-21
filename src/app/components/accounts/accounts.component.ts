import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  displayMsg: string = '';
  isAccountRegistered: boolean = false;
  constructor(private authService: AuthService) {
    
  }
  ngOnInit():void{

  }
  registerform = new FormGroup({
    FullName: new FormControl("", Validators.required),
    FathersName: new FormControl("", Validators.required),
    MobileNumber: new FormControl("", [Validators.required, Validators.maxLength(10),Validators.minLength(10)]),
    EmailId : new FormControl("", Validators.required),
    Aadhar : new FormControl("", [Validators.maxLength(12), Validators.minLength(12), Validators.required]),
    DOB : new FormControl("", [Validators.required]),
    RAddress : new FormControl("", [Validators.required]),
    PAddress : new FormControl("", [Validators.required]),
    RState : new FormControl("", [Validators.required]),
    PState : new FormControl("", [Validators.required]),
    RCity : new FormControl("", [Validators.required]),
    PCity : new FormControl("", [Validators.required]),
    RPincode : new FormControl("", [Validators.required]),
    PPincode : new FormControl("", [Validators.required]),
    OccupationType : new FormControl("", [Validators.required]),
    Income : new FormControl("", Validators.required),
    AnnualIncome : new FormControl("" ,Validators.required),
  });

  registerSubmitted(){
    console.log(this.registerform.valid);

    this.authService.registerUser([
      this.registerform.value.FullName,
      this.registerform.value.FathersName,
      this.registerform.value.MobileNumber,
      this.registerform.value.EmailId,
      this.registerform.value.Aadhar,
      this.registerform.value.DOB,
      this.registerform.value.RAddress,
      this.registerform.value.PAddress,
      this.registerform.value.RState,
      this.registerform.value.PState,
      this.registerform.value.RCity,
      this.registerform.value.PCity,
      this.registerform.value.RPincode,
      this.registerform.value.PPincode,
      this.registerform.value.OccupationType,
      this.registerform.value.Income,
      this.registerform.value.AnnualIncome
    ]).subscribe(res =>
      {
        if(res == 'Success'){
          this.displayMsg = 'Account Registered Successfully';
          this.isAccountRegistered = true;
        }
        else if(res == 'Email already exists'){
          this.displayMsg= 'Try Another Email';
          this.isAccountRegistered = false;
        }
        else{
          this.displayMsg='Something Went Wrong';
          this.isAccountRegistered = false; 
        }
      })
  }

  get FullName(): FormControl{
    return this.registerform.get("FullName") as FormControl;
  }
  get FathersName(): FormControl{
    return this.registerform.get("FathersName") as FormControl;
  }
  get MobileNumber(): FormControl{
    return this.registerform.get("MobileNumber") as FormControl;
  }
  get EmailId(): FormControl{
    return this.registerform.get("EmailId") as FormControl;
  }
  get Aadhar(): FormControl{
    return this.registerform.get("Aadhar") as FormControl;
  }

  get DOB(): FormControl{
    return this.registerform.get("DOB") as FormControl;
  }
  get RAddress(): FormControl{
    return this.registerform.get("RAddress") as FormControl;
  }
  get PAddress(): FormControl{
    return this.registerform.get("PAddress") as FormControl;
  }
  get RState(): FormControl{
    return this.registerform.get("RState") as FormControl;
  }
  get PState(): FormControl{
    return this.registerform.get("PState") as FormControl;
  }
  get RCity(): FormControl{
    return this.registerform.get("RCity") as FormControl;
  }
  get PCity(): FormControl{
    return this.registerform.get("DOB") as FormControl;
  }
  get RPincode(): FormControl{
    return this.registerform.get("RPincode") as FormControl;
  }
  get PPincode(): FormControl{
    return this.registerform.get("PPincode") as FormControl;
  }
  get OccupationType(): FormControl{
    return this.registerform.get("OccupationType") as FormControl;
  }
  get Income(): FormControl{
    return this.registerform.get("Income") as FormControl;
  }
  get AnnualIncome(): FormControl{
    return this.registerform.get("AnnualIncome") as FormControl;
  }
}
