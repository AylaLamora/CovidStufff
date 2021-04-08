import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { EncuestaService } from '../../services/encuesta.service';

//Services
import { PermisosService } from '../../services/permisos.service';

// Material
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: [
    './encuesta.component.css',
    './encuesta.component.css',
  ],
  providers: [
   EncuestaService
  ],
})
export class EncuestaComponent implements OnInit {
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  forma: FormGroup;

  editar = true;
  usuarios: any = [];
  usserLogged: any;
date=Date;
  permiso: boolean;
  dia: number;
  permisoUsuario = {
    _id: '',
    fecha: null,
    changes: null,
    deletes: null,
    permisos: null,
    email:null
  };
  usuariosParche:any = [];


  nombreReceta: string;
  ingredientes: any[];

  user = {
    _id: '',
    nombreCli:''
  }

  day: any;
  month: any;
  year: any;
  hours: any;
  minutes: any;
  fecha: any;
  
  pipe = new DatePipe('en-US'); // Use your own locale
  today = Date.now();
  hour = this.pipe.transform(this.today, 'shortTime');

  constructor(
    public users: PermisosService,
    private router: Router,
    public encuestaService: EncuestaService,
    private _snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private authService: AuthService,

    
  ) {
   this.forma = this.crearFormulario();

   this.day = new Date().getDate();
   this.month = new Date().getMonth() + 1;
   this.year = new Date().getFullYear();
   this.hours = new Date().getHours();
   this.fecha = `${this.day}/${this.month}/${this.year} ${this.hour}`;
    
  }
  ngOnInit() {
    /*Cambiar color del fondo*/
    this.permisoUsuario.email = this.authService.getUserLoggedIn();
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
    this.Verificar();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }



  onSubmit() {
    if(!this.forma.valid){
     this.openSnackBar('Verifique que la información esté correcta', 'End');
     return
    }  

    if (this.forma.value._id == '' || this.forma.value._id == null) {
      this.forma.value.date = this.fecha;
      this.encuestaService.postDatos(this.forma.value).subscribe((res) => {
        this.openSnackBar('Se Guardo Correctamente', 'End');
      });
      this.router.navigate(['/principal']);
    }
  }

  crearFormulario(){

    return new FormGroup({
       _id        : new FormControl(''), 
       nombre     : new FormControl(''),
       sexo       : new FormControl(''),
       direccion  : new FormControl(''),
       estadocivil: new FormControl(''),
       salud      : new FormControl(''),
       edad       : new FormControl(''),
       date       : new FormControl(''),
       diabetes   : new FormControl(''),
       hiper      : new FormControl(''),
       asma       : new FormControl(''),
       cardiaco   : new FormControl(''),
       tos        : new FormControl(''),
       cabeza     : new FormControl(''),
       olfato     : new FormControl(''),
       garganta   : new FormControl(''),
       muscular   : new FormControl(''),
       gusto      : new FormControl(''),

    })

  }

  Verificar() {
    this.usuarios = this.users.getUsuarios().subscribe((usuarios) => {
      this.usuariosParche = usuarios;
      for (let usuario of this.usuariosParche) {        
        if (usuario.email == this.permisoUsuario.email) {
          this.permisoUsuario.permisos=usuario.permisos;
          this.permiso=usuario.permisos,
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
} //CIERRA CLASS ClienteComponent


