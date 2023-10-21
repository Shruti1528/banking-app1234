import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  displayMsg: string = '';
  islogin: boolean = false;
  userdetails: any = null;
  constructor(private loginAuth: AuthService, private router: Router, private data: GlobaldataService){

  }

  ngOnInit(): void {
      
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required, Validators.minLength(6),
    Validators.maxLength(10) ]),
  });

  

  loginSubmit(){
    this.loginAuth.loginUser([this.loginForm.value.email, this.loginForm.value.pwd])
    .subscribe(res=> {
      if(res == 'Failure'){
        alert('Login Fail');
        this.islogin = false;
      }
      else if(this.loginAuth.isloggedIn()){
        alert('Already logged In');
      }
      else{
        this.loginAuth.setToken(res); 
        this.islogin= true;
        if(this.loginForm.value.email){
          localStorage.setItem('LoginEmail', this.loginForm.value.email);
        }
        // this is function to get User details and set account to local storage 
        this.loginAuth.getInterBank([localStorage.getItem('LoginEmail')]).subscribe(res => 
          {
            if(res != null){
             this.userdetails = res;
             localStorage.setItem("UserAccount",this.userdetails.accountNumber);
            }
            else{
              console.log("failed");
            }
          })
        
        this.router.navigateByUrl('dashboard');
      }
    })
  }


  
  get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }
}
