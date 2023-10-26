import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaldataService } from 'src/app/services/globaldata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  UserDetails: any;
 
  constructor(private auth:AuthService, private data: GlobaldataService, private router:Router) {
    this.UserDetails = data.UserData;
  }

  ngOnInit(): void {
    this.loadUserDetails();
      
  }
  loadUserDetails() {
    if (this.auth.isLoggedIn()) {
      // Fetch user details
      this.auth.getUserDetails().subscribe(
        (data) => {
          // Handle successful response
          this.UserDetails = data;
          console.log('User Details:', this.UserDetails);
        },
        (error) => {
          // Handle error
          console.error('Failed to fetch user details:', error);
        }
      );
    } else {
      // Redirect to the login page if the user is not logged in
      this.router.navigateByUrl('/login');
    }
  }
}
