import { NgForm } from '@angular/forms';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import {NewsFeedService} from './news-feed.service'

// Services

//Models

//Material


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
   /*Cambiar color del fondo*/
   bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
   htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
 
  articles:any
  constructor(
    private newsService:NewsFeedService
  ) {
    this.loadNews();
  }

  loadNews(){
    //everything?q=coronavirus   top-headlines?country=mx   everything?q=coronavirus?country=mx
    this.newsService.getNews('top-headlines?q=COVID&country=mx').subscribe(news=>{
      this.articles=news['articles'];
      console.log(this.articles)
    })
  }
  ngOnInit() {
    /*Cambiar color del fondo*/
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
  }

} //AQUI CIERRA TODO
