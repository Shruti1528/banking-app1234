import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-benificary',
  templateUrl: './add-benificary.component.html',
  styleUrls: ['./add-benificary.component.css']
})
export class AddBenificaryComponent implements OnInit{
  repeatpass: string = 'none';
  displaymsg: string = '';
  isbenificary: boolean = false;
  constructor(private auth: AuthService){

  }

  ngOnInit(): void{
    
  }

  benificaryForm = new FormGroup({
    Name: new FormControl("", Validators.required),
    account: new FormControl("", Validators.required),
    caccount: new FormControl("", Validators.required)
  });

  benificarySubmit(){
    if(this.account.value == this.caccount.value){
      this.repeatpass = 'none';
      this.auth.AddUser([this.benificaryForm.value.Name, this.benificaryForm.value.account])
      .subscribe(res =>{
        if(res == 'Success'){
          this.displaymsg = "Benificary Added Sucessfully"
          this.isbenificary = true;
        }
        else{
          this.displaymsg = "Something went wrong";
          this.isbenificary = false;
        }
      })

    }
    else{
      this.repeatpass = 'inline'
    }
  }

  get Name(): FormControl{
    return this.benificaryForm.get("Name") as FormControl;
  }

  get account(): FormControl{
    return this.benificaryForm.get("account") as FormControl;
  }

  get caccount(): FormControl{
    return this.benificaryForm.get("caccount") as FormControl;
  }
}
