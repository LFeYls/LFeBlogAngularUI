import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor() { }


  logError(error:any){
    console.error('Blog demo','An error happened',error);
  }
}
