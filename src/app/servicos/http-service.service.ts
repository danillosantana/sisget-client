import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NgLoadingService } from '../ng-loading/ng-loading.service';

const httpOptions = {
    headers: new HttpHeaders({
        responseType: 'blob'
    })
  };

@Injectable()
export class HttpService {

    constructor( private loadingService: NgLoadingService, private http: HttpClient ) { }
 
    get(url: string) {
        return this.watch(this.http.get<any>(url));
    }
    
    /**
     * Realiza do download de algum arquivo.
     * 
     * @param url 
     */
    downloadFile(url: string) {
        this.loadingService.showLoading();
        this.http.get(url, { responseType: 'blob' }).subscribe(
            data => {
              this.loadingService.hideLoading(); 
              var file = new Blob([data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
            },
            e => { this.loadingService.hideLoading() } 
          );
    }
    
    post(url: string, data) {
      return this.watch(this.http.post<any>(url, data));
    }
     
    //fazer também para o post, put, delete ...
    private watch(response: Observable<any>) {
 
        this.loadingService.showLoading();

        return response.pipe(
            tap(
              data => this.loadingService.hideLoading(),
              error => this.loadingService.hideLoading()
            ),
        );    
    }
}
