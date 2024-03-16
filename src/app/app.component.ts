import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { User } from './user';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './nav/nav.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterModule, MatButtonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    //if not expired TODO probably need to centralize

    if (token)
      this.router.navigate(['/', 'home']);

  }

}


