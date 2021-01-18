import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractFormBuilder } from "src/app/shared/abstract-form-builder";

export class MovimentacaoBean {
     id : any;
     descricao : any;
     tipoOperacao : any;
     tipoMovimentacao : any;
     valor : any;
     indice : any;
     comprovante : any;

     constructor() {
         this.id = undefined;
         this.descricao = undefined;
         this.tipoOperacao = undefined;
         this.tipoMovimentacao = undefined;
         this.valor = undefined;
         this.indice = undefined;
         this.comprovante = undefined;
     }
}

@Injectable()
export class MovimentacaoFormBuilderService extends AbstractFormBuilder<MovimentacaoBean> {
    controls : MovimentacaoBean = new MovimentacaoBean();

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }
    
    atualizarControls(form: FormGroup) {
        this.controls = new MovimentacaoBean();
        this.controls.id = form.controls['id'];
        this.controls.descricao = form.controls['descricao'];
        this.controls.tipoOperacao = form.controls['tipoOperacao'];
        this.controls.tipoMovimentacao = form.controls['tipoMovimentacao'];
        this.controls.valor = form.controls['valor'];
        this.controls.indice = form.controls['indice'];
        this.controls.comprovante = form.controls['comprovante'];
    }
}