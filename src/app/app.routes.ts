import { Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BillingComponent } from './billing/billing.component';
import { ComplaintsComponent } from './complaints/complaints.component';

export const routes: Routes = [
    { path: 'code', component: CodeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'complaints', component: ComplaintsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
