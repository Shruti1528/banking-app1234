import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userdetails: any;
  userpayment: any;
  constructor(private auth: AuthService, private router:Router, private data:GlobaldataService){
    
  }
  ngOnInit(): void {
      
  }

  logout(){
    this.auth.removeToken();
    this.router.navigateByUrl('/login');
  }

  btnClick(){
    this.auth.getAccountDetails([localStorage.getItem('LoginEmail')]).subscribe(res => 
      {
        if(res != null){
         this.userdetails = res;
         this.router.navigateByUrl('user');
         this.data.UserData = this.userdetails;
        }
        else{
          console.log("failed");
        }
      });
      
  }

  btnpayment(){
    this.auth.getPayments([localStorage.getItem('UserAccount')]).subscribe(resp =>{
      if(resp != null){
        this.userpayment = resp;
        this.router.navigateByUrl('getpayment');
        this.data.UserPayment = this.userpayment;
        console.log(resp);
      }
    });
  }

  goUpdatePassword(){
    this.router.navigateByUrl('updatepassword');
  }

  goAddBenificary(){
    this.router.navigateByUrl('addbenificary');
  }

  goTransaction(){
    this.router.navigateByUrl('transaction')
  }
}
