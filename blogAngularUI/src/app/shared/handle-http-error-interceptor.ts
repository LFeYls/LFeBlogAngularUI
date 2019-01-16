import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {GlobalErrorHandler} from "./global-error-handler";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor{

  constructor(private globalErrorHanler:GlobalErrorHandler){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error.error instanceof Error){
          const errorToLog= `Http error (client/network). ${error.message}`;
          this.globalErrorHanler.handleError(errorToLog);
        } else{
          const errorToLog=`Http error (unsucessful reponse). Message:${error.message},status code:${(error).status},body:${JSON.stringify(error.error)}`;
          this.globalErrorHanler.handleError(errorToLog);
        }

        if (error.status === 422) {
          return throwError(error.error);
        }
      })
    )
  }
}
