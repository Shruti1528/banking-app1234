import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Beneficiary } from '../components/add-benificary/add-benificiary.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5179/api/";
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();

  registerUser(account: Array<any>) {
    return this.http.post(this.baseUrl + "Register/RegisterAccount", {
      FullName: account[0],
      FathersName: account[1],
      MobileNumber: account[2],
      Email: account[3],
      AadharNumber: account[4],
      DOB: account[5],
      RAddress: account[6],
      PAddress: account[7],
      RState: account[8],
      PState: account[9],
      RCity: account[10],
      PCity: account[11],
      RPincode: account[12],
      PPincode: account[13],
      OccupationType: account[14],
      Income: account[15],
      AnnualIncome: account[16]
    },
      {
        responseType: 'text',
      });
  }
  registerInternetBanking(user: Array<any>) {
    return this.http.post(this.baseUrl + "Register/RegisterInternetBanking", {
      AccountNumber: user[0],
      Email: user[1],
      Password: user[2],
      OTP:user[3]
    }, { responseType: 'text', });
  }
  loginUser(loginInfo: Array<any>) {
    return this.http.post(this.baseUrl + "Register/Login", {
      Email: loginInfo[0],
      Password: loginInfo[1],
    }, { responseType: 'text', })
  }
  /*forgotPassword(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Register/forgotpassword`, { model}, { responseType: 'text' });
  }*/
  forgotPassword(user: any): Observable<string> {
    return this.http.post(this.baseUrl + "Register/forgotpassword", {
      UserId: user.UserId
    }, { responseType: 'text' });
  }
  
  resetPassword(model: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}Register/resetpassword`, model, { responseType: 'text' as 'json' });
  }
  AddUser(loginInfo: Array<any>){
    return this.http.post(this.baseUrl + "Dashboard/SaveBeneficiary", {
      name: loginInfo[0],
      accountNumber: loginInfo[1],
    }, {responseType:'text',})
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      UserEmail: userInfo.email,
      UserAccountNumber: userInfo.acnumber
    } : null;
    this.currentUser.next(data);

    console.log(data);
  }
  isLoggedIn(): boolean{
    return localStorage.getItem("access_token") ? true : false
  }
  removeToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("LoginEmail");
  }

  getUserDetails(): Observable<any> {
    // You can use the access token to authenticate the request to the API
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.baseUrl + "Dashboard/GetUserDetails", { headers });
  }
 
  payment(user: Array<any>){
    const token = localStorage.getItem('access_token');

  if (!token) {
    return throwError('Access token is missing.');
  }

  // Set the Authorization header with the token
  const headers = {
    'Authorization': `Bearer ${token}`
  };
    return this.http.post(this.baseUrl + "Dashboard/AddTransaction", {
      mode: user[0],
      payerAccount: user[1],
      payeeAccount: user[2],
      amount: user[3],
      tDate: user[4],
      remark: user[5],
    }, {responseType:'text',})
  }

 saveBeneficiary(beneficiary: Beneficiary): Observable<any> {
    // Use the access token for authentication
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.baseUrl + "Dashboard/SaveBeneficiary", beneficiary, { responseType: 'text' });
 }
 changePassword(passwordData: any): Observable<any> {
  // Use the access token for authentication
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(
    this.baseUrl + 'Dashboard/changepassword',
    passwordData,
    { headers, responseType: 'text' }
  );
 }
 performTransaction(transactionData: any): Observable<any> {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('access_token');

  if (!token) {
    return throwError('Access token is missing.');
  }

  // Set the Authorization header with the token
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  // Make the HTTP POST request
  return this.http.post(this.baseUrl + 'Dashboard/Transaction', transactionData, { headers, responseType: 'text' });
 }
 getMyTransactions(): Observable<any> {
  // You can use the access token to authenticate the request to the API
  const token = localStorage.getItem("access_token");
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any[]>(this.baseUrl + "Dashboard/GetMyTransactions", { headers });
} 
}
