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
  selector: 'app-complaints',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent {

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router) { }

  complaintsForm = this.formBuilder.group({
    text: '',
  });


  onSubmit() {
    console.log(this.complaintsForm.value)
    this.appService.createComplaint(this.complaintsForm.value).subscribe(response => {
    })

    this.complaintsForm.reset();

  }
}
