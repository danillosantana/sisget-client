import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { MensagensService } from '../../mensagens/mensagens.service';
import { PoupService } from '../../servicos/poup.service';
import { DataTableService } from '../../servicos/data-table.service';
import { ContaService } from './../conta.service';
import { NUMERO_REGISTRO } from '../../classes/util/app-config';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  conta : any ;
  tiposContas : any = [];
  tiposPessoa : any = [];
  tiposSituacoes : any = [];
  mascaraNumeroRegistro : string  = NUMERO_REGISTRO.CPF;
  habilitarCpfCnpj : boolean = false;
  @Output() voltarEmitter : EventEmitter<any> = new EventEmitter<any>();

  constructor(private mensagemService : MensagensService, public contaService : ContaService,
    private poupService : PoupService, public dataTableService : DataTableService) { }

  ngOnInit() {
    this.inicializarTiposPessoa();
    this.inicializarConta();
    this.inicializarTiposConta();
    this.inicializarTiposSituacoes();
  }

  /**
   * Inicializa as depêndencias necessárias do registro.
   */
  inicializarConta() {
    this.conta = {};
    this.conta.pessoa = {};
    this.conta.pessoa.tipoPessoa = {};
    this.conta.tipoConta = {};
    this.conta.tipoSituacao = {};
  }

  /**
   * Inicializar tipos de pessoas.
   */
  inicializarTiposPessoa() {
    this.contaService.getTiposPessoa().subscribe(
      data => {
        this.tiposPessoa = data;
        this.conta.pessoa.tipoPessoa = 0;
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    );
  }

  /**
   * Inicializar tipos de registros.
   */
  inicializarTiposConta() {
    this.contaService.getTiposConta().subscribe(
      data => {
        this.tiposContas = data;
        this.conta.tipoConta = 0;
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    );
  }

   /**
   * Inicializar tipos de situações da conta.
   */
  inicializarTiposSituacoes() {
    this.contaService.getTiposSituacoes().subscribe(
      data => {
        this.tiposSituacoes = data;
        this.conta.tipoSituacao = this.tiposSituacoes[0];
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    );
  }

  /**
   * Define a máscado do número de registro.
   */
  definirMascaraNumeroRegistro() {
    this.habilitarCpfCnpj = this.conta.pessoa.tipoPessoa != 0;
    this.conta.pessoa.numeroRegistro = '';

    if (this.conta.pessoa.tipoPessoa.id == 1) {
        this.mascaraNumeroRegistro = NUMERO_REGISTRO.CPF;
    } else {
      this.mascaraNumeroRegistro = NUMERO_REGISTRO.CNPJ;
    }

    if (this.conta.pessoa.tipoPessoa == 0) {
      this.mascaraNumeroRegistro = '';
    }
  }

  /**
   * Salva o registro.
   */
  salvar() {
    this.conta.tipoConta = this.conta.tipoConta == 0 ? undefined : this.conta.tipoConta;
    this.conta.pessoa.tipoPessoa =  this.conta.pessoa.tipoPessoa == 0 ? undefined : this.conta.pessoa.tipoPessoa;

    this.contaService.salvar(this.conta).subscribe(
      data => {
        // this.mensagemService.addMensagemSucesso(data);
        this.inicializarConta();
        this.voltar();
      },
      err => {
          this.conta.tipoConta = this.conta.tipoConta == undefined ? 0 : this.conta.tipoConta;
          this.conta.pessoa.tipoPessoa =  this.conta.pessoa.tipoPessoa == undefined ? 0 : this.conta.pessoa.tipoPessoa;
          // this.mensagemService.addMensagemErro(err.error);
        }
    );
  }

  /**
   * Volta para a tela de listagem;
   */
  voltar() {
    this.voltarEmitter.emit("");
  }

  /**
   * Retorna a pessoa.
   */
  getPessoa() {
    if (this.conta.pessoa != undefined && this.conta.pessoa.numeroRegistro != undefined) {
      this.contaService.getPessoaPorNumeroRegistro(this.conta.pessoa.numeroRegistro).subscribe(
        data => {
          let tipoPessoa = this.conta.pessoa.tipoPessoa;
          let numeroRegistro = this.conta.pessoa.numeroRegistro;
          this.conta.pessoa =  data;
          if (data != null && data.id != undefined) {
            this.conta.pessoa.numeroRegistro =  new String(this.conta.pessoa.numeroRegistro);
            this.tiposPessoa.forEach(item => {
              if (item.id == this.conta.pessoa.tipoPessoa.id) {
                this.conta.pessoa.tipoPessoa = item;
               }
              });
            } else {
              this.conta.pessoa.tipoPessoa = tipoPessoa;
              this.conta.pessoa.numeroRegistro = numeroRegistro;
            }
        },
        err => {
          // this.mensagemService.addMensagemErro(err.error);
        }
      ); 
    }
  }
}
