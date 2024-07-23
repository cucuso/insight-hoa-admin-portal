import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Md5} from 'ts-md5';


import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router) { }


  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    code: '',
    password:'',
  });



  onSubmit() {
    const user:any = this.registerForm.value;
    user['password'] = Md5.hashStr(user.password);

    this.appService.createUser(user).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.appService.changedLoggedState(true);
      this.router.navigate(['/', 'home']);
    })

  }
}
