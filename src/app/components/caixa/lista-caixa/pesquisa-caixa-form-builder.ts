import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractFormBuilder } from "src/app/shared/abstract-form-builder";

export class FiltroCaixaBean {
    mes : any;
    ano : any;

    constructor() {
        this.mes = undefined;
        this.ano = undefined;
    }
}


@Injectable()
export class PesquiasCaixaFormBuilderService extends AbstractFormBuilder<FiltroCaixaBean> {
    controls: FiltroCaixaBean = new FiltroCaixaBean();

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }

    atualizarControls(form: FormGroup) {
        this.controls = new FiltroCaixaBean();
        this.controls.ano = form.controls['ano'];
        this.controls.mes = form.controls['mes'];
    }
}   