import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractFormBuilder } from "src/app/shared/abstract-form-builder";

export class UsuarioSenhaBean {

    id : any;
    novaSenha: any;
    confirmacaoSenha: any;

    constructor() {
        this.id = undefined;
        this.novaSenha = undefined;
        this.confirmacaoSenha = undefined;
    }
}

export class UsuarioSenhaFormBuilderService extends AbstractFormBuilder<UsuarioSenhaBean> {
   
   controls : UsuarioSenhaBean = new UsuarioSenhaBean();

   constructor(public formBuilder: FormBuilder) {
       super(formBuilder);
   }

   atualizarControls(form: FormGroup) {
       this.controls = new UsuarioSenhaBean();
       this.controls.id = form.controls['id'];
       this.controls.novaSenha = form.controls['novaSenha'];
       this.controls.confirmacaoSenha = form.controls['confirmacaoSenha'];
   }
}