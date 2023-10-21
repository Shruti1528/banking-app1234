import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  repeatpass: string = 'none';
  displaymsg: string = '';
  isUpdated: boolean = false;
  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
      
  }

  passwordForm = new FormGroup({
    OldPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    NewPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    CPassword: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
  });

  passwordSubmit(){
    if(this.NewPassword.value == this.CPassword.value){
      console.log(this.passwordForm.valid);
      this.repeatpass = 'none';
      this.authService.changePassword([this.passwordForm.value.OldPassword, this.passwordForm.value.NewPassword, localStorage.getItem('LoginEmail')])
      .subscribe(res => {
        if(res == 'NotFound'){
          this.displaymsg = "Password Not Changed";
          this.isUpdated = false;
        }
        else{
          this.displaymsg = "Password Changed Sucessfully";
          this.isUpdated = true;
        }
      })
    }
    else{
      this.repeatpass = 'inline';
    }
  }

get OldPassword(): FormControl{
  return this.passwordForm.get("OldPassword") as FormControl;
}
get NewPassword(): FormControl{
  return this.passwordForm.get("NewPassword") as FormControl;
}
get CPassword(): FormControl{
  return this.passwordForm.get("CPassword") as FormControl;
}
}
