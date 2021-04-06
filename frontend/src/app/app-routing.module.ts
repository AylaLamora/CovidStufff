import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { AcercaComponent }     from './components/acerca/acerca.component';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

// Seguridad
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: 'registro',component: RegistroComponent},
  {path: 'error',component: ErrorPageComponent},
  {path: 'login',component: LoginComponent},
  {path: 'principal',component: PrincipalComponent,canActivate:[AuthGuard]},
  {path: 'encuesta',component: EncuestaComponent,canActivate:[AuthGuard]},
  {path: 'noticias',component: NoticiasComponent,canActivate:[AuthGuard]},
  {path: 'contacto',component: ContactoComponent },
  {path: 'acerca',component: AcercaComponent,canActivate:[AuthGuard] },
  {path: 'resultados',component:  ResultadosComponent,canActivate:[AuthGuard] },
  {path: 'bebidas',component:  BebidasComponent,canActivate:[AuthGuard] },
  {path: 'ventas',component:  VentasComponent,canActivate:[AuthGuard] },
  //{path: '#Inter',pathMatch:'full' },
  {path: '', pathMatch:'full', redirectTo:'login' },
  {path: '**',  pathMatch:'full', redirectTo:'error'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
