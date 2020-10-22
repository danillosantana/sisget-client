import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation, ViewChild  } from '@angular/core';
import { CaixaService } from '../../caixa/caixa.service';
import { MensagensService } from '../../mensagens/mensagens.service';
import { PoupService } from '../../servicos/poup.service';
import {DataTableService} from '../../servicos/data-table.service';
import { CaixaTO } from 'src/app/model/dto/caixa.to';
import { FiltroCaixaBean, PesquiasCaixaFormBuilderService } from './pesquisa-caixa-form-builder';
import { FormGroup } from '@angular/forms';
import { MesTO } from 'src/app/model/dto/mes.to';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import { ObjectList } from 'src/app/model/objects/object-list';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-lista-caixa',
  templateUrl: './lista-caixa.component.html',
  styleUrls: ['./lista-caixa.component.css'],
  providers: [PesquiasCaixaFormBuilderService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Componente responsável pela manipulação lista de caixa.
 * 
 * @author Danillo Santana	
 */
export class ListaCaixaComponent implements OnInit {

  caixasTO : Array<CaixaTO> = [];
  filtro   : any = {};
  meses    : Array<ObjectList> = [];
  formPesquisaCaixa: FormGroup;

  @Output() enviarCaixaParaVisualizacao : EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarCaixaParaAlteracao : EventEmitter<any> = new EventEmitter<any>();
  @Output() novoCaixaEmitter : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dt') dt: Table;

  constructor(public caixaService : CaixaService, public mensagemService : MensagensService, 
              public poupService : PoupService, public dataTableService : DataTableService,
              public pesquisaCaixaFormBuilderService : PesquiasCaixaFormBuilderService) { 

  }

  openModal(template: TemplateRef<any>) {
    this.poupService.show(template);
  }

  closeModal(template : TemplateRef<any>) {
    this.poupService.hide();
  }

  ngOnInit() {
    this.construirForm();
    this.buscarListas()
        .then(() => {
          this.pesquisaCaixaFormBuilderService.atualizarControls(this.formPesquisaCaixa);
          this.setarMesDefault();
        });
  }

  buscarListas() {
    return Promise.all([
      this.buscarMeses(),
      this.buscarCaixas()
    ]);
  }


  construirForm() {
    const filtroCaixaBean = new FiltroCaixaBean();
    this.formPesquisaCaixa = this.pesquisaCaixaFormBuilderService.buildForm(filtroCaixaBean);
  }

  buscarCaixas() {
    return this.caixaService.getCaixasTOsPorAnoVigente()
    .toPromise()
    .then( (caixasTO : Array<CaixaTO>) => {
        this.caixasTO = caixasTO;        
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
        console.log('error -> ', err);
      }
    );
  }

  /**
  * Envia os dados do caixa para que sejam visualizados.
  */
 visualizar(caixaTO) {
    this.enviarCaixaParaVisualizacao.emit(caixaTO);
  }

  /**
  * Envia os dados do caixa para que sejam atualizados.
  */
  alterar(caixaTO) {
    this.enviarCaixaParaAlteracao.emit(caixaTO);
  }

  novoCaixa() {
    this.novoCaixaEmitter.emit("");
  }

    /**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
      this.caixaService.getRelatorioCaixa(idCaixa);
  }
  
  /**
   * Realiza a pesquisa de caixas.
   */
  pesquisar() {
    let filtro = FormBuilderUtil.parseForEntity(this.formPesquisaCaixa, new FiltroCaixaBean()); 
    this.caixaService.getCaixasTOPorFiltro(filtro)
    .subscribe(
      data => {
        this.caixasTO = data;
        this.filtro.mes == undefined ? this.setarMesDefault() : this.filtro.mes;
        this.dataTableService.setarDataTable(this.caixasTO);
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
        Swal.fire({
          icon: 'error',
          title: 'Caixas',
          text: err
        });
      }
    );
  }

  setarMesDefault() {
    if (this.meses?.length > 0) {
       this.meses.forEach(m => {
          if (m.value === 1) {
            this.formPesquisaCaixa.controls.mes.setValue(m);
          }
       }) 
    }
  }

  /**
   * Inicializa a lista de meses
   */
  buscarMeses() {
    return this.caixaService.getMeses().subscribe(
      (meses : Array<MesTO>) => {
        this.meses = meses.map(m => new ObjectList(m.descricao, m.id));
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
        console.log('error -> ',err);
      }
    );
  }

  /**
   *Reseta o formulário.
   */
  limpar() {
    this.filtro = {};
    this.filtro.mes = 0;
    this.caixasTO = [];
    this.dataTableService.setarDataTable([]);
  }
}
