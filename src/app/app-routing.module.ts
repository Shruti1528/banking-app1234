import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './compnents/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { InternetBankingComponent } from './components/internet-banking/internet-banking.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AddBenificaryComponent } from './components/add-benificary/add-benificary.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionPaymentComponent } from './components/transaction-payment/transaction-payment.component';

const routes: Routes = [
  {
    path: 'register',
    component: AccountsComponent
  },
  {
    path: 'internetBanking',
    component: InternetBankingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user',
    component: UserDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'updatepassword',
    component: UpdatePasswordComponent,
    canActivate: [authGuard]
  },
  {
    path: 'addbenificary',
    component: AddBenificaryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'getpayment',
    component: TransactionPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
