import{Injectable}from '@angular/core';
import{enviorment}from './enviorment';
import{HttpClient}from '@angular/common/http';

const API_URL = enviorment.API_URL;
const API_KEY = enviorment.API_KEY;

@Injectable({
    providedIn:'root'
})
export class NewsFeedService{
    constructor(private http:HttpClient){}

    getNews(url){
        return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`)
    }
}

