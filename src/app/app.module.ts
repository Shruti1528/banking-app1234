import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { InternetBankingComponent } from './components/internet-banking/internet-banking.component';
import { LoginComponent } from './compnents/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AddBenificaryComponent } from './components/add-benificary/add-benificary.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionPaymentComponent } from './components/transaction-payment/transaction-payment.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AccountsComponent,
    InternetBankingComponent,
    LoginComponent,
    DashboardComponent,
    UserDetailsComponent,
    UpdatePasswordComponent,
    AddBenificaryComponent,
    TransactionComponent,
    TransactionPaymentComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
