import { Injectable, Output, EventEmitter} from '@angular/core';


/**
 * Classe que fornece os serviços necessários para loading.
 */
@Injectable({
  providedIn: 'root'
})
export class NgLoadingService {

  static loading = new EventEmitter<boolean>();

  constructor() { }

  showLoading() {
    NgLoadingService.loading.emit(true);       
  }

  hideLoading(){
    NgLoadingService.loading.emit(false);
  }
}
