import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth: AuthService,private router:Router)
  {
  }
 
 
  url:string="";
  logout(){
    this.auth.removeToken();
  }
  
  ngOnInit()
  {
    this.url=this.router.url;
    
  }
  back()
  {
    if(this.url=="/user" || this.url=="/addbenificary" || this.url=="/updatepassword" || this.url=="/transaction" || this.url=="/getpayment")
    {
      this.router.navigateByUrl('dashboard');
    }
    else
    {
      this.router.navigateByUrl('home');
    }
  }
}
