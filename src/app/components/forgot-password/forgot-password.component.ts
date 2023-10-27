import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  displayMsg: string = '';
  isPasswordReset: boolean = false;

  forgotPasswordForm = new FormGroup({
    UserId: new FormControl("", [Validators.required,Validators.email])
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    this.authService.forgotPassword({
      UserId: this.forgotPasswordForm.value.UserId
    }).subscribe(
      (response) => {
        console.log('Success: ', response);
        // Handle success, e.g., display a success message to the user
        this.displayMsg = 'OTP sent successfully.';
        alert('OTP sent successfully.');
        this.isPasswordReset = true;
        this.router.navigate(['/resetpassword'])
      },
      (error) => {
        console.error('Error: ', error);
        // Handle error, e.g., display an error message to the user
        if (error instanceof Error) {
          // Handle client-side error
        } else {
          // Handle server-side error
          this.displayMsg = error.error; // Assuming the error message is provided by the server
          this.isPasswordReset = false;
        }
      }
    );
  }

  // Optional: You can add getters for form controls if needed
  get UserId(): FormControl {
    return this.forgotPasswordForm.get("UserId") as FormControl;
  }
}


