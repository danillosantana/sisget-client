import { Injectable } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  totalItensPorPagina : number = 20;
  data : any[];
  returnedArray: any[];

  ngOnInit(): void {
    
  }
  
  /**
   * Define
   * 
   * @param dataTable 
   */
  setarDataTable(dataTable) {
    this.data = dataTable;
    this.returnedArray = this.data.slice(0, this.totalItensPorPagina);
  }

  mudarPagina(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedArray = this.data.slice(startItem, endItem);
  }
}
