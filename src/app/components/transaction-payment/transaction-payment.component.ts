import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';

@Component({
  selector: 'app-transaction-payment',
  templateUrl: './transaction-payment.component.html',
  styleUrls: ['./transaction-payment.component.css']
})
export class TransactionPaymentComponent implements OnInit{
  transactions: any[]= [];
  
  constructor(private authService: AuthService){
  
  }
  ngOnInit(): void{
    this.authService.getMyTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      console.log(this.transactions,"ss");
    });

  }

  
}
