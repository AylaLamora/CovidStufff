import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

//Services

//Models

//Material
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css'],
  providers: [],
})
export class AcercaComponent implements OnInit {
  

  constructor(
    private _snackBar: MatSnackBar,
    private dialogo: MatDialog
  ) {}

  ngOnInit() {
  }
} //Aqui cierra
