import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  repeatPassword: string = 'none';
  resetPasswordMessage: string = '';
  isResetPasswordSuccessful: boolean = false;

  resetPasswordForm = new FormGroup({
    userId: new FormControl("", Validators.required),
    otp: new FormControl("", Validators.required),
    newPassword: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch the user ID from the route parameters or wherever you have it
    this.route.params.subscribe(params => {
      // Assuming 'userId' is a parameter in the route
      this.resetPasswordForm.patchValue({
        userId: params['userId']
      });
    });
  }

  resetPasswordSubmit() {
    if (this.newPassword.value === this.confirmPassword.value) {
      console.log(this.resetPasswordForm.valid);
      this.repeatPassword = 'none';

      // Call your service method for resetting password
      this.authService.resetPassword({
        userId: this.resetPasswordForm.value.userId,
        otp: this.resetPasswordForm.value.otp,
        newPassword: this.resetPasswordForm.value.newPassword
      }).subscribe((res) => {
        if (res === 'Password reset successfully.') {
          this.isResetPasswordSuccessful = true;
          this.resetPasswordMessage = res;
          alert('Password reset successfully.');
          this.router.navigate(['/login']);

        } else {
          this.isResetPasswordSuccessful = false;
          this.resetPasswordMessage = 'Something went wrong.';
        }
      });
    } else {
      this.repeatPassword = 'inline';
    }
  }

  get userId(): FormControl {
    return this.resetPasswordForm.get("userId") as FormControl;
  }

  get otp(): FormControl {
    return this.resetPasswordForm.get("otp") as FormControl;
  }

  get newPassword(): FormControl {
    return this.resetPasswordForm.get("newPassword") as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.resetPasswordForm.get("confirmPassword") as FormControl;
  }
}
