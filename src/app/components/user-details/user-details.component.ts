import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  UserDetails: any;
 
  constructor(private auth:AuthService, private data: GlobaldataService) {
    this.UserDetails = data.UserData;
  }

  ngOnInit(): void {
      
  }

  
}
