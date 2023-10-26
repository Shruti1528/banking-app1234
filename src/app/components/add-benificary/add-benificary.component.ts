import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-benificary',
  templateUrl: './add-benificary.component.html',
  styleUrls: ['./add-benificary.component.css']
})
export class AddBenificaryComponent implements OnInit{
  repeatpass: string = 'none';
  displaymsg: string = '';
  isbenificary: boolean = false;
  confirmAccountNumberError: string="";
  constructor(private auth: AuthService, private router:Router){

  }

  ngOnInit(): void{
    
  }

  benificaryForm = new FormGroup({
    Name: new FormControl("", Validators.required),
    account: new FormControl("", Validators.required),
    caccount: new FormControl("", Validators.required)
  });

  benificarySubmit(){
    if (this.benificaryForm.valid) {
      this.repeatpass = 'none';

      const name: string = this.benificaryForm.get('Name')?.value || '';
      const accountNumber: string = this.benificaryForm.get('account')?.value || '';
      const confirmAccountNumber: string = this.benificaryForm.get('caccount')?.value || '';
      if (accountNumber !== confirmAccountNumber) {
        this.benificaryForm.get('confirmAccountNumber')?.setErrors({ accountNumberMismatch: true });
        this.confirmAccountNumberError = 'Confirm Account Number must match Account Number.';
        return;
      } else {
        this.confirmAccountNumberError = ''; // Clear the error message if they match
      }
      const beneficiaryData = {
        name: name,
        accountNumber: accountNumber,
      };
      this.auth.saveBeneficiary(beneficiaryData).subscribe(
        (response: any) => {
          if (response === 'Beneficiary saved successfully.') {
            this.displaymsg = 'Beneficiary added successfully';
            this.isbenificary = true;
            //this.authService.setMessageOnDashboard('Beneficiary added successfully');
            console.log('Response:', response);
            //this.router.navigate(['/dashboard'])
            this.benificaryForm.reset();
          } else {
            this.displaymsg = 'An error occurred while adding the beneficiary.';
            this.isbenificary = false;
          }
        },
        (error) => {
          console.error('Error adding beneficiary:', error);
          this.displaymsg = 'An error occurred while adding the beneficiary. Please check the console for details.';
          //this.isBeneficiaryAdded = false;
        }
      );
    } else {
      this.repeatpass = 'inline';
    }
  }
  get Name(): FormControl{
    return this.benificaryForm.get("Name") as FormControl;
  }

  get account(): FormControl{
    return this.benificaryForm.get("account") as FormControl;
  }

  get caccount(): FormControl{
    return this.benificaryForm.get("caccount") as FormControl;
  }
}
