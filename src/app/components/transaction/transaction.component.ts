import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  currentdate: any = new Date();
  displayMsg: string = "";
  paymentSuccess: boolean = false;
  constructor(private auth:AuthService){

  }

  ngOnInit(): void {
      
  }

  transactionForm = new FormGroup({
    transactionType: new FormControl("",Validators.required),
    fromAccount: new FormControl("", Validators.required),
    toAccount: new FormControl("", Validators.required),
    amount: new FormControl("", Validators.required),
    remark: new FormControl("", Validators.required),
  });
  
  transactionSubmit() {
    // Handle form submission here
    if (this.transactionForm.valid) {
    
      this.auth.payment([
        this.transactionForm.value.transactionType,
        this.transactionForm.value.fromAccount,
        this.transactionForm.value.toAccount,
        this.transactionForm.value.amount,
        this.currentdate,
        this.transactionForm.value.remark
      ]).subscribe(res => 
        {
          if(res == 'Success'){
            this.displayMsg = "Money Transfer Successfully";
            this.paymentSuccess = true;
          }
          else{
            this.displayMsg = "Please try After Sometime";
            
          }
        })
        console.log(this.transactionForm.value.transactionType);
    } else {
      console.log('Form is invalid');
    }
  }

  get transactionType(): FormControl{
    return this.transactionForm.get("transactionType") as FormControl;
  }
  get fromAccount(): FormControl{
    return this.transactionForm.get("fromAccount") as FormControl;
  }
  get ToAccount(): FormControl{
    return this.transactionForm.get("toAccount") as FormControl;
  }
  get amount(): FormControl{
    return this.transactionForm.get("amount") as FormControl;
  }
  get remark(): FormControl{
    return this.transactionForm.get("remark") as FormControl;
  }
}

