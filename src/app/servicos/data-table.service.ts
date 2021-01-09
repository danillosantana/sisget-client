import { Injectable } from '@angular/core';


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

  /**
   * Define
   * 
   * @param dataTable 
   */
  setarDataTableFiltro(dataTable) {
    var data = dataTable;
    this.returnedArray = data.slice(0, this.totalItensPorPagina);
  }

  /**
   * Passa para a próxima página.
   * 
   * @param event 
   */
  // mudarPagina(event: PageChangedEvent): void {
  //   const startItem = (event.page - 1) * event.itemsPerPage;
  //   const endItem = event.page * event.itemsPerPage;

  //   this.returnedArray = this.data.slice(startItem, endItem);
  // }

  /**
   * Realiza a ordenação ascendente do data table.
   * 
   * @param parametro 
   */
  sortDown(parametro) {
    this.data.sort(function(a, b){
      let colunas = parametro.split('.');
      var valorA = colunas.length == 1 ? a[colunas[0]]  : a[colunas[0]][colunas[1]];
      var valorB = colunas.length == 1 ? b[colunas[0]]  : b[colunas[0]][colunas[1]];

      if (typeof valorA == 'number') {
        return valorB-valorA;
      } else {
        
        if (valorA.toLowerCase() < valorB.toLowerCase())
         return 1;
        if (valorA.toLowerCase() > valorB.toLowerCase())
         return -1;
        return 0; 
      }
     });
    this.setarDataTable(this.data);
  }

   /**
   * Realiza a ordenação descrecente do data table.
   * 
   * @param parametro 
   */
  sortUp(parametro) {
    let colunas = parametro.split('.');
    this.data.sort(function(a, b){
      var valorA = colunas.length == 1 ? a[colunas[0]]  : a[colunas[0]][colunas[1]];
      var valorB = colunas.length == 1 ? b[colunas[0]]  : b[colunas[0]][colunas[1]];

      if (typeof valorA == 'number') {
        return valorA-valorB;
      } else {
        if (valorA.toLowerCase() < valorB.toLowerCase())
          return -1;
        if (valorA.toLowerCase() > valorB.toLowerCase())
        return 1;
        return 0; 
      }
     });
    this.setarDataTable(this.data);
  }

  filtrar(parametro, filtro) {
    let colunas = parametro.split('.');
    
    var dataFiltro : any[];
      if (colunas.length > 1) {
        dataFiltro = this.data.filter(
          (item) => {
            if (item[colunas[0]] != undefined) {
               return item[colunas[0]][colunas[1]].toLowerCase().includes(filtro.toLowerCase());
            } else {
               return filtro == '-';
            }
          }
        );
      } else {
        dataFiltro = this.data.filter(
          (item) => {
            if (item[colunas[0]] != undefined) {
               return item[colunas[0]].toLowerCase().includes(filtro.toLowerCase());
            } else {
               return filtro == '-';
            }
          }
        );
      }

      this.setarDataTableFiltro(dataFiltro);
  }
}

