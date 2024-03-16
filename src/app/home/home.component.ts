import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  tenants:any = [];


  constructor(private appService: AppService){}
  
  
  ngOnInit(): void {
    this.appService.getTenants(1).subscribe(response => {
      this.tenants = response;
    })
  }

}
