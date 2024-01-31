import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { User } from './user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'InsightHoaAdmin';
  users?: [User];



  constructor(private httpClient: HttpClient,  private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.getUsers();
}

  getUsers() {
    console.log('getting current users');
    this.httpClient.get<[any]>('http://localhost:8080/users').subscribe(response => {
      this.users = response;
    });
  }
}


