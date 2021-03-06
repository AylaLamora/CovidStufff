import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

//Services

// Models

//Módulos necesarios para generación del PDF

// Material
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [ ],
})
export class PrincipalComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
/*Cambiar color del fondo*/
bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
  ngOnInit() { 
     /*Cambiar color del fondo*/
     this.bodyTag.classList.remove('login-page');
     this.htmlTag.classList.remove('login-page');
  }

  // Move to specific slide
  navigateToSlide(item) {
    this.ngCarousel.select(item);
    console.log(item)
  }

  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }

  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }

  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }

  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }
}