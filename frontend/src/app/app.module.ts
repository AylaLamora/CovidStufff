import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Material
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

//Services
import { TokenInterceptorService } from './services/token-interceptor.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    SidebarComponent,
    PrincipalComponent,
    EncuestaComponent,
    ContactoComponent,
    ResultadosComponent,
    NoticiasComponent,
    FilterPipe,
    AcercaComponent,
    BebidasComponent,
    VentasComponent,
    DialogComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
