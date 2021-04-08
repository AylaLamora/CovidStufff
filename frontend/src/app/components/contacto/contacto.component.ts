import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';

//Services
import { AuthService } from '../../services/auth.service';
import { PermisosService } from '../../services/permisos.service';


import { HttpClient } from '@angular/common/http'

//Material
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: [
    './contacto.component.css',
    './contacto.component.css',
  ],
  providers: [],
})
export class ContactoComponent implements OnInit {
   /*Cambiar color del fondo*/
   bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
   htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
 

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;




  editar = true;

  usuarios: any = [];
  usserLogged: any;

  permiso: boolean;
  dia: number;

  categoria = '';
  articulo = '';
  mlText = '';
  mililitros = null;
  cod = null;

  selectedCliente: string = '';


  day = new Date();

  constructor(
    public users: PermisosService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialogo: MatDialog
  ) { }




  permisoUsuario = {
    _id: '',
    fecha: null,
    changes: null,
    deletes: null,
    permisos: null,
  };

  ngOnInit() {
        /*Cambiar color del fondo*/
        this.bodyTag.classList.add('login-page');
        this.htmlTag.classList.add('login-page');
    this.usserLogged = this.authService.getUserLoggedIn();
    this.Verificar();
    this.dia = this.day.getDate();


  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  Verificar() {
    this.users.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      for (let usuario of this.usuarios) {
        if (usuario.email == this.usserLogged) {
          this.capturar(
            usuario.changes,
            usuario.deletes,
            usuario._id,
            usuario.permisos
          );
        }
      }
    });
  }

  capturar(changes, deletes, id, permisos) {
    this.permisoUsuario._id = id;
    this.permisoUsuario.changes = changes;
    this.permisoUsuario.deletes = deletes;
    this.permisoUsuario.permisos = permisos;
    //console.log(this.permisoUsuario.permisos);
  }



}
