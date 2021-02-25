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
  }

} //AQUI CIERRA TODO
