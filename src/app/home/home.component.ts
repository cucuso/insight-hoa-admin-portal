import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
/* Core Data Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { Component, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';


import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// TODO rename to tenants, not home
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, AgGridAngular],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

 // Row Data: The data to be displayed.
 rowData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];
/*

        "email": "eddi1@wow.com",
        "firstName": "Eddie",
        "lastName": "Jones",
        "unit": "3323",
        "code": "555",
        "password": "202cb962ac59075b964b07152d234b70",
        "cars": null,
        "pets": null,
        "createdDate": null,
        "updatedDate": null
*/
 
// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
  { field: "firstName" },
  { field: "lastName" },
  { field: "email" },
  { field: "unit" },
  { field: "pets" },
  { field: "cars" }
];

  tenants: any = [];


  constructor(private appService: AppService, public dialog: MatDialog) { }

  // get tenants from user only what
  ngOnInit(): void {
    this.appService.getTenants().subscribe(response => {
      this.tenants = response;
    })
  }

  openDialog(tenant: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: tenant,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
