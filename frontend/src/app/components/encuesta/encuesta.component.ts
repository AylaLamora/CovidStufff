import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AuthService } from '../../services/auth.service';

//Services
import { PermisosService } from '../../services/permisos.service';
import { RecetasService } from '../../services/recetas.service';
import { DatosClientesService } from '../../services/clientes.service';
import { DatosInventarioService } from '../../services/inventario.service';

// Models
import { DatosRecetas } from '../../../models/recetas';
import { DatosClientes } from '../../../models/clientes';
import { DatosInventario } from '../../../models/inventario';

//Módulos necesarios para generación del PDF
import { PdfService } from '../../services/sub-services/pdf.service';

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
  providers: [DatosClientesService, DatosInventarioService, RecetasService],
})
export class EncuestaComponent implements OnInit {
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
  sortedData: DatosClientes[];

  forma: FormGroup;

  editar = true;
  usuarios: any = [];
  usserLogged: any;

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

  constructor(
    public users: PermisosService,
    private router: Router,
    public datosClientesService: DatosClientesService,
    public datosInventarioService: DatosInventarioService,
    public recetasService: RecetasService,
    public pdf: PdfService,
    private _snackBar: MatSnackBar,
    private dialogo: MatDialog,
    private authService: AuthService,

    
  ) {
   this.forma = this.crearFormulario();
    
  }

  ngOnInit() {
    /*Cambiar color del fondo*/
    this.permisoUsuario.email = this.authService.getUserLoggedIn();
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
    this.Verificar();
    this.resetForm();
    this.getAllCliente();
    this.refrescarListaClientes();
    this.refrescarInventarios();
    this.refrescarRecetas();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }


  getAllCliente() {
    let resp = this.datosClientesService.getDatosList();
    resp.subscribe((res) => (this.sortedData = res as DatosClientes[]));
  }

  onEdit(emp:any ) {
    this.forma.patchValue(emp)
  }

  onSubmit() {
    if(!this.forma.valid){
     this.openSnackBar('Verifique que la información esté correcta', 'End');
     return
    }  

    if (this.forma.value._id == '' || this.forma.value._id == null) {

      this.datosClientesService.postDatos(this.forma.value).subscribe((res) => {
        this.getAllCliente();
        this.openSnackBar('Se Guardo Correctamente', 'End');
        this.resetForm();
      });
    } else {
      this.datosClientesService.putDatos(this.forma.value).subscribe((res) => {
        this.openSnackBar('Se Actualizo Correctamente', 'End');
          this.RemplazarOldName(this.forma);
          this.getAllCliente();
      });
    }
  }

  onDelete(emp: DatosClientes) {
    this.dialogo
      .open(DialogComponent, {
        data: `¿Estás Seguro que deseas eliminarlo?`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.datosClientesService.deleteDato(emp._id).subscribe((res) => {
            this.getAllCliente();
          });
          this.openSnackBar('Se Elimino Correctamente', 'End');
        } else {
          this.openSnackBar('Misión Abortada', 'End');
        }
      });
  }

    RemplazarOldName(form){
      for (const nombre of this.datosInventarioService.DatosInventario) {
          if(nombre.clientes == form.value._id){
            this.user._id = nombre._id;
            this.user.nombreCli  = form.value.nombre;
            this.datosInventarioService.putDatosNombre(this.user).subscribe((res) =>{
            })
          }
      }
    }

  refrescarInventarios() {
    this.datosInventarioService.getDatosList().subscribe((res) => {
      this.datosInventarioService.DatosInventario = res as DatosInventario[];
    });
  }
  refrescarRecetas() {
    this.recetasService.getDatosList().subscribe((res) => {
      this.recetasService.DatosReceta = res as DatosRecetas[];
    });
  }
  refrescarListaClientes() {
    this.datosClientesService.getDatosList().subscribe((res) => {
      this.datosClientesService.DatosClientes = res as DatosClientes[];
    });
  }

  resetForm() {
    if (this.forma) 
      this.forma.reset({
        _id: ''
      });
    this.datosClientesService.selectClientes = {
      _id: '',
      nombre: '',
      razonSocial: '',
      rfc: '',
      direccion: '',
      colonia: '',
      estado: '',
      cp: null,
      correo: '',
      telefono: null,
      inventario: [],
      recetas: [],
    };
  }

  crearFormulario(){

    return new FormGroup({
      _id         : new FormControl(''), 
       nombre     : new FormControl('', Validators.required), 
       correo     : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       telefono   : new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]),
       rfc        : new FormControl('', [Validators.required,  Validators.minLength(5)]),
       razonSocial: new FormControl('', Validators.required),
       direccion  : new FormControl('', Validators.required),
       colonia    : new FormControl('', Validators.required),
       estado     : new FormControl('', Validators.required),
       cp         : new FormControl('', [Validators.required, Validators.minLength(5)]),
    })

  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'correo':
          return compare(a.correo, b.correo, isAsc);
        case 'telefono':
          return compare(a.telefono, b.telefono, isAsc);
        case 'rfc':
          return compare(a.rfc, b.rfc, isAsc);
        case 'razonSocial':
          return compare(a.razonSocial, b.razonSocial, isAsc);
        case 'direccion':
          return compare(a.direccion, b.direccion, isAsc);
        case 'colonia':
          return compare(a.colonia, b.colonia, isAsc);
        case 'estado':
          return compare(a.estado, b.estado, isAsc);
        case 'cp':
          return compare(a.cp, b.cp, isAsc);
        default:
          return 0;
      }
    });
  }
   value:any;

  forceLower(strInput){
    strInput.value = strInput.value.toLowerCase();
  }
  campoNoValido(campo:string){
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && (this.forma.get('nombre').dirty || this.forma.get('nombre').touched);
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get telefonoNoValido() {
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched;
  }

  get rfcNoValido() {
    return this.forma.get('rfc').invalid && this.forma.get('rfc').touched;
  }

  get razonNoValido() {
    return this.forma.get('razonSocial').invalid && this.forma.get('razonSocial').touched;
  }

  get direccionNoValido() {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
  }  
  
  get coloniaNoValido() {
    return this.forma.get('colonia').invalid && this.forma.get('colonia').touched;
  }

  get estadoNoValido() {
    return this.forma.get('estado').invalid && this.forma.get('estado').touched;
  }

  get cpNoValido() {
    return this.forma.get('cp').invalid && this.forma.get('cp').touched;
  }

  get _id() {
    return this.forma.get('_id');
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




function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
