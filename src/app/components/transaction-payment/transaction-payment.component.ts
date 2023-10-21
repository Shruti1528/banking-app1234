import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from 'src/app/services/globaldata.service';

@Component({
  selector: 'app-transaction-payment',
  templateUrl: './transaction-payment.component.html',
  styleUrls: ['./transaction-payment.component.css']
})
export class TransactionPaymentComponent implements OnInit{
  userpayment: any;
  
  constructor(private data: GlobaldataService){
    this.userpayment = data.UserPayment;
  }
  ngOnInit(): void{

  }

  
}
