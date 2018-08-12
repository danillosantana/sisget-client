import { Directive , ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { DataTableService } from '../servicos/data-table.service';


@Directive({
  selector: '[filterColumn]'
})
export class FilterColumnDirective {

  @Input('filterColumn') parametro: string;
  input : any;

  constructor(private elementRef: ElementRef, private renderer : Renderer2, private dataTableService : DataTableService) { 

  }

  ngOnInit() {
    this.criarFiltro();
    
  }

  criarFiltro() {
    this.input = this.renderer.createElement('input');
    this.renderer.addClass(this.input, 'form-control');
    this.renderer.appendChild(this.elementRef.nativeElement, this.input);
  }

  @HostListener('keypress')
  filtrar() {
    this.dataTableService.filtrar(this.parametro, this.input.value);
  }

  /**
   * 
   */
  @HostListener('keydown') 
  keypressDown() {
    if (this.input.value == "") {
      this.dataTableService.setarDataTable(this.dataTableService.data);
    }
  }

}
