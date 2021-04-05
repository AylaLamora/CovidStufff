import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ChartOptions, ChartType, ChartDataSets,  } from 'chart.js'; // Librerias de gráfico
import { Label } from 'ng2-charts';

//Services
import { BebidasService } from '../../services/bebidas.service';
import { DatosClientesService } from '../../services/clientes.service';
import { DatosInventarioService } from '../../services/inventario.service';

//Models
import { DatosClientes } from '../../../models/clientes';
import { DatosInventario } from '../../../models/inventario';

//Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  providers: [DatosInventarioService, DatosClientesService, BebidasService],
})
export class ResultadosComponent implements OnInit {

  // INICIO :grafico
  public barChartOptions: ChartOptions = {
    responsive : true,
    scales     : {
      xAxes: [{
        ticks: {
          fontColor: "white",
          fontSize: 14,
          stepSize: 1,
          beginAtZero: true
      }}],
      yAxes: [{
        ticks: {
        fontColor: "white",
        fontSize: 14,
        stepSize: 1,
        beginAtZero: true
}}]},
    legend     : {
                    labels   : {fontColor: 'white'},
                    position : 'top',
                 },

  }
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public barChartType: ChartType = 'line';
  public barChartLegend = false;
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225, 255, 255, 0)',
      borderColor: 'rgba(225, 255, 255, 1)',
      pointBackgroundColor: 'rgba(225, 255, 255, 1)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ff0000',
      pointHoverBorderColor: 'rgba(225, 0, 0, 0)'
    },
    { // second color
      backgroundColor: 'rgba(225, 10, 24, 0)',
      borderColor: 'rgba(96, 125, 139, 1)',
      pointBackgroundColor: 'rgba(96, 125, 139, 1)',
      pointBorderColor: '#607d8b',
      pointHoverBackgroundColor: '#ff0000',
      pointHoverBorderColor: 'rgba(225, 0, 0, 0)'
    }
  ];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Encuesta 1' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Encuesta 2' }
  ];

  //PIE
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Riesgo'], ['Posible portador'], ['Sin riesgo']];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(96, 125, 139, 1)',  'rgba(63, 81, 181, 1)', 'rgba(255, 193, 7, 1)'],
    },
  ];
  // FIN : grafico

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialogo: MatDialog
  ) {}

  ngOnInit() {
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  public chartClicked(e:any):void {
    console.log(e);
    }
    
    public chartHovered(e:any):void {
    console.log(e);
    }

} //Aqui cierra TODO
