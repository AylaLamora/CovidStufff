import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { LogService } from '../../services/log.service';
import { saveAs } from 'file-saver';

//Services
import { AuthService } from '../../services/auth.service';
import { PermisosService } from '../../services/permisos.service';

//Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /*Cambiar color del fondo*/
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  word: string = '';
  
  day = new Date();
  diaActual: number;

  usuarios: any = [];
  usuariosParche: any = [];
  contrasena:string = 'password'
  flag:boolean = false;

  user = {
    email: '',
    password: '',
    permisos: null,
  };

  permisoUsuario = {
    id: '',
    fecha: null,
    changes: null,
    deletes: null,
    permisos: null,
  };

  constructor(
    // private logger: LogService,
    private authService: AuthService,
    private router: Router,
    private users: PermisosService,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    /*Cambiar color del fondo*/
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
    this.diaActual = this.day.getDate();
  }
  
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  Verificar() {
    this.usuarios = this.users.getUsuarios().subscribe((usuarios) => {
      this.usuariosParche = usuarios;
      for (let usuario of this.usuariosParche) {
        if (usuario.email == this.user.email) {
          this.capturarDatosUsuario(usuario._id, usuario.changes, usuario.fecha, usuario.deletes);
        }
      }
    });
  }
  testLog(): void {
    // this.logger.log("Test the `log()` Method");
}
  capturarDatosUsuario(id, changes, dia, deletes) {
    this.permisoUsuario.id = id;
    this.permisoUsuario.changes = changes;
    this.permisoUsuario.deletes = deletes;

    let diaUser = (this.permisoUsuario.fecha = dia);

    if (true) {
      this.openSnackBar('Iniciaste sesion como Administrador','End');
      this.permisoUsuario.permisos = true;
    }

    if (diaUser != this.diaActual) {
      this.permisoUsuario.changes = 2;
      this.permisoUsuario.deletes = 2;
      this.permisoUsuario.fecha = this.diaActual;
    }else{
      this.permisoUsuario.fecha = this.diaActual;
    }

    if (this.permisoUsuario.permisos == true) {
      this.permisoUsuario.changes = 2;
      this.permisoUsuario.deletes = 2;
    }

    this.users.putDatos(this.permisoUsuario).subscribe((res) => {});
  }
  
  signIn() {
    this.authService.signIn(this.user).subscribe((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(this.user.email));
       // this.logger.log(this.user.email+" logged on");
        
        this.router.navigate(['/principal']);
      },
      (err) => {
        this.openSnackBar('Contraseña incorrecta o Correo no existente','End');
        console.log(err);
      }
    );
  }

  monstrarContrasena(monstrar){
      this.flag = monstrar;
      this.contrasena = (this.flag == true) ? 'text':'password'
  }
  
  ngOnDestroy() {
    /*Cambiar color del fondo*/
    this.bodyTag.classList.remove('login-page');
    this.htmlTag.classList.remove('login-page');
  }
}