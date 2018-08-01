import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable({
  providedIn: 'root'
})
export class PoupService {

  static modalRef: BsModalRef;
  private static modalSerice;

  constructor(private modalService: BsModalService) { 
  }

  /**
   * Abre o modal.
   */
 show(template: TemplateRef<any>) {
    PoupService.modalRef = this.modalService.show(template);
 }

 /**
  * Fecha o modal.
  */
 hide() {
   PoupService.modalRef.hide();
 }
}
