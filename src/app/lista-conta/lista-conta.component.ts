import { Component, OnInit } from '@angular/core';

import { AcaoSistema } from '../classes/util/acao-sistema';
import { MensagensService } from '../mensagens/mensagens.service';
import { PoupService } from '../servicos/poup.service';
import { DataTableService } from '../servicos/data-table.service';
import { ContaService } from './conta.service';
import { NUMERO_REGISTRO } from '../classes/util/app-config';

@Component({
  selector: 'app-lista-registro',
  templateUrl: './lista-conta.component.html',
  styleUrls: ['./lista-conta.component.css']
})

/**
 * Componente responsável pela manipulação lista de registro.
 * 
 * @author Danillo Santana	
 */
export class ListaContaComponent implements OnInit {

  acaoSistema : AcaoSistema = new AcaoSistema();	
  contasTO : any = [];

  constructor(private mensagemService : MensagensService, public contaService : ContaService,
    private poupService : PoupService, public dataTableService : DataTableService) { }

  ngOnInit() {
    this.init();
  }

  /**
   * Inicializa as depêndencias do caso de uso.
   */
  init() {
    this.acaoSistema.setaAcaoParaListar();
    this.dataTableService.setarDataTable([]);
    this.inicializarContas();
  }

  /**
   * Inicializa as lista de contas.
   */
  inicializarContas() {
    this.contaService.getContasTO().subscribe(
      data => {
        this.contasTO = data;
        this.dataTableService.setarDataTable(this.contasTO);
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    ); 
  }

  /**
   * Seta a ação para inclusão de novo conta.
   */
  novaConta() {
    this.acaoSistema.setaAcaoParaIncluir();
  }

  /**
   * Retorna a máscara do numero de registro.
   * 
   * @param pessoaJuridica 
   */
  getMascara(pessoaJuridica) {
    return pessoaJuridica ? NUMERO_REGISTRO.CNPJ : NUMERO_REGISTRO.CPF;
  }

  /**
   * Inativa o registro
   * 
   * @param idConta 
   */
  inativar(idConta) {
    this.contaService.inativar(idConta).subscribe(
      data => {
        // this.mensagemService.addMensagemSucesso(data);
        this.init();
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    ); 
  }

  /**
   * Ativa o registro
   * 
   * @param idConta 
   */
  ativar(idConta) {
    console.log('fdsfda', idConta);
    this.contaService.ativar(idConta).subscribe(
      data => {
        // this.mensagemService.addMensagemSucesso(data);
        this.init();
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    ); 
  }
}
