import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

//Services
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
  selector: 'ngbd-carousel-basic',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DatosClientesService, DatosInventarioService, RecetasService],
})
export class PrincipalComponent implements OnInit {

    constructor(
  ) {
  }

  ngOnInit() {
  }

}
