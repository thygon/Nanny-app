import {Injectable,NgModule} from '@angular/core';
import {Observable }from 'rxjs/Observable';
import { HttpEvent,
         HttpInterceptor,
         HttpHandler,
         HttpRequest,
         HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppProvider } from '../providers/app/app';

@Injectable()
export class MyInterceptor implements HttpInterceptor{
    token:string;
    constructor(private app:AppProvider){
    this.token = this.app.geFromStore('apitoken');
    }

    intercept( req:HttpRequest<any>,next:HttpHandler):
    Observable<HttpEvent<any>>{
        
        const dupReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+this.token)
            });
            return next.handle(dupReq);
    }

};

@NgModule({
    providers:[
        {provide:HTTP_INTERCEPTORS,useClass:MyInterceptor,multi:true}
    ]
})
export class InterceptorModule {

}