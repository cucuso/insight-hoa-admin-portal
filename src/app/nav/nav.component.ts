import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    MatMenuModule
  ]
})
export class NavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  email = '';
  isLoggedIn = false;


  constructor(private router: Router, private appService: AppService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {

    this.appService.currentLoggedInStatus.subscribe(status => {
      this.isLoggedIn = status;
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        this.email = decodedToken.sub || '';
      }
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.email = decodedToken.sub || '';
      this.isLoggedIn = true;
    }



  }


  signOut() {
    localStorage.removeItem('token');
    this.appService.changedLoggedState(false);
    this.router.navigate(['/'])

  }

}
