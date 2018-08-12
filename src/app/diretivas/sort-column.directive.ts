import { Directive , ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { DataTableService } from '../servicos/data-table.service'

@Directive({
  selector: '[sortColumn]'
})
/**
 * Diretiva para ordenação dos dados da tabela.
 */
export class SortColumnDirective {

  private sortDown : boolean = true;
  private icon : any;
  @Input('sortColumn') column: string;

  constructor(private elementRef: ElementRef, private renderer : Renderer2, 
              private dataTableService : DataTableService) { 
  }

  ngOnInit() {
    this.criarIconeSort();
    this.adicionarSortDown();
 }

 /**
  * Cria o ícone para ordenação das colunas.
  */
 criarIconeSort() {
  this.icon = this.renderer.createElement('i');
  this.renderer.appendChild(this.elementRef.nativeElement, this.icon);
 }


 /**
  * Cria o ícone de ordenação ascendente.
  */
 adicionarSortDown() {
   this.renderer.addClass(this.icon, 'fa');
   this.renderer.addClass(this.icon, 'fa-angle-down');
 }

 /**
  * Cria o ícone de ordenação descrecente.
  */
 adicionarSortUp() {
   this.renderer.addClass(this.icon, 'fa');
   this.renderer.addClass(this.icon, 'fa-angle-up');
 }

 /**
  * Realiza a ordenação dos elementos.
  */
 @HostListener('click') 
 sort() {
    if (this.sortDown) {
      this.renderer.removeClass(this.icon, 'fa-angle-down');
       this.adicionarSortUp();
       this.dataTableService.sortUp(this.column);
    } else {
      this.renderer.removeClass(this.icon, 'fa-angle-up');
      this.adicionarSortDown();
      this.dataTableService.sortDown(this.column);
    }
    
    this.sortDown = !this.sortDown;
 }


}
