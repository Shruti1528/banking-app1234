import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  repeatpass: string = 'none';
  displaymsg: string = '';
  isUpdated: boolean = false;
  constructor(private authService: AuthService, private router:Router){

  }
  ngOnInit(): void {
      
  }

  passwordForm = new FormGroup({
    OldPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    NewPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    ConfirmPassword: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
  });

  // passwordSubmit(){
  //   if(this.NewPassword.value == this.ConfirmPassword.value){
  //     console.log(this.passwordForm.valid);
  //     this.repeatpass = 'none';
  //     this.authService.changePassword([this.passwordForm.value.OldPassword, this.passwordForm.value.NewPassword, localStorage.getItem('LoginEmail')])
  //     .subscribe(res => {
  //       if(res == 'NotFound'){
  //         this.displaymsg = "Password Not Changed";
  //         this.isUpdated = false;
  //       }
  //       else{
  //         this.displaymsg = "Password Changed Sucessfully";
  //         this.isUpdated = true;
  //       }
  //     })
  //   }
  //   else{
  //     this.repeatpass = 'inline';
  //   }
  // }
  passwordSubmit() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.NewPassword === this.passwordForm.value.ConfirmPassword) {
        console.log(this.passwordForm.valid);
        this.repeatpass = 'none';

        // Call your service method for updating password
        this.authService.changePassword({
          OldPassword: this.passwordForm.value.OldPassword,
          NewPassword: this.passwordForm.value.NewPassword,
          ConfirmPassword: this.passwordForm.value.ConfirmPassword

        }).subscribe((response) => {
          // Password changed successfully
          console.log('Password changed successfully:', response);
          this.displaymsg = 'Password changed successfully';
          alert('Password changed successfully');
          // Clear form values here if needed
          this.router.navigate(['/dashboard']);
          this.passwordForm.reset();
        }, (error) => {
          // Password change failed, display error message
          console.error('Error changing password:', error);
          this.displaymsg = error;
        });
      } else {
        this.repeatpass = 'inline';
      }
    }
  }

get OldPassword(): FormControl{
  return this.passwordForm.get("OldPassword") as FormControl;
}
get NewPassword(): FormControl{
  return this.passwordForm.get("NewPassword") as FormControl;
}
get ConfirmPassword(): FormControl{
  return this.passwordForm.get("ConfirmPassword") as FormControl;
}
}
