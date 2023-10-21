import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {
  public UserData: any ;
  public UserPayment: any;
  constructor() { }
}
