import { Injectable } from '@angular/core';
import { fstat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  log(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
    
}
}
