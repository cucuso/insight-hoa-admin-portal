import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Md5} from 'ts-md5';


import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router) { }

  loginForm = this.formBuilder.group({
    email: '',
    password:'',
  });


  onSubmit() {
    
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password||'';

    this.appService.login(email, Md5.hashStr(password)).subscribe(response => {
      this.router.navigate(['/', 'home']);
      
      localStorage.setItem('token', response.token);
      this.appService.changedLoggedState(true);
    })

    this.loginForm.reset();

  }
}
