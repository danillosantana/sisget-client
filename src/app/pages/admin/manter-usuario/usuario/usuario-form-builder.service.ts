import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AbstractFormBuilder } from "src/app/shared/abstract-form-builder";

export class UsuarioBean {

     id : any;
     nome: any;
     email: any;
     permissoes: any;

     constructor() {
         this.id = undefined;
         this.nome = undefined;
         this.email = undefined;
         this.permissoes = undefined;
     }
}

export class UsuarioFormBuilderService extends AbstractFormBuilder<UsuarioBean> {
    
    controls : UsuarioBean = new UsuarioBean();

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }

    atualizarControls(form: FormGroup) {
        this.controls = new UsuarioBean();
        this.controls.id = form.controls['id'];
        this.controls.nome = form.controls['nome'];
        this.controls.email = form.controls['email'];
        this.controls.permissoes = form.controls['permissoes'];

        this.setValidators();
    }

    private setValidators() {
        this.controls.email = new FormControl('', Validators.email);   
    }
}