import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ViewChild, Input  } from '@angular/core';
import { CaixaService } from '../caixa.service';
import { CaixaTO } from 'src/app/model/dto/caixa.to';
import { FiltroCaixaBean, PesquiasCaixaFormBuilderService } from './pesquisa-caixa-form-builder';
import { FormGroup } from '@angular/forms';
import { MesTO } from 'src/app/model/dto/mes.to';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import { Table } from 'primeng/table';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ArquivoService } from 'src/app/servicos/arquivo.service';
import { ObjectList } from 'src/app/model/objects/object-list';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-lista-caixa',
  templateUrl: './lista-caixa.component.html',
  styleUrls: ['./lista-caixa.component.css'],
  providers: [PesquiasCaixaFormBuilderService, MensagemService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Componente responsável pela manipulação lista de caixa.
 * 
 * @author Danillo Santana	
 */
export class ListaCaixaComponent implements OnInit {

  caixasTO : Array<CaixaTO> = [];
  meses    : Array<SelectItem> = [];
  formPesquisaCaixa: FormGroup;

  @Input() apenasMembresia : boolean;

  @Output() enviarCaixaParaVisualizacao : EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarCaixaParaAlteracao : EventEmitter<any> = new EventEmitter<any>();
  @Output() novoCaixaEmitter : EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dt') dt: Table;

  constructor(public caixaService : CaixaService, public mensagemService : MensagemService, 
              public pesquisaCaixaFormBuilderService : PesquiasCaixaFormBuilderService,
              public arquivoService : ArquivoService) { 

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
    return this.caixaService.getCaixasTO()
    .toPromise()
    .then( (caixasTO : Array<CaixaTO>) => {
        this.caixasTO = caixasTO;        
      }, (httpErrorResponse: HttpErrorResponse) => {
        this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.message);
      });
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
      this.arquivoService.getRelatorioCaixa(idCaixa);
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
      }, (httpErrorResponse: HttpErrorResponse) => {
        this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.message);
      });
  }

  setarMesDefault() {
    if (this.meses?.length > 0) {
       this.meses.forEach(m => {
          if (m.value === null) {
            this.formPesquisaCaixa.controls.mes.setValue(m.value);
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
        this.meses.push({ label : 'Selecione', value :null});
        meses.forEach(m => this.meses.push({label : m.descricao, value : m.id}));
      }, (httpErrorResponse: HttpErrorResponse) => {
        this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse.message);
      });
  }

  /**
   *Reseta o formulário.
   */
  limpar() {
    this.pesquisaCaixaFormBuilderService.controls.ano.setValue(undefined);
    this.pesquisaCaixaFormBuilderService.controls.mes.setValue(undefined);
    this.caixasTO = [];
    this.buscarCaixas();
  }
}
