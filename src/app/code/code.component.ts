import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {

  isCodeValid: boolean = true;

  constructor(private appService: AppService, private router: Router) { }

  validate(code: any) {
    this.appService.validateCode(code).subscribe(response => {
      this.isCodeValid = response;

      if (response == true) {
        this.router.navigate(['/', 'register', { code: code }]);
      } else {
        console.log('invalidCOde');
        this.isCodeValid = false;
      }

    })


  }

}
