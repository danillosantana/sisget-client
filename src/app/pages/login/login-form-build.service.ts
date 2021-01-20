import { FormBuilder, FormGroup } from "@angular/forms";
import { AbstractFormBuilder } from "src/app/shared/abstract-form-builder";

export class LoginBean {
    email : any;
    senha : any;

    constructor() {
        this.email = undefined;
        this.senha = undefined;
    }
}

export class LoginFormBuildService extends AbstractFormBuilder<LoginBean> {

    controls : LoginBean = new LoginBean();

    constructor(public formBuilder: FormBuilder) {
        super(formBuilder);
    }
    
    atualizarControls(form: FormGroup) {
        this.controls = new LoginBean();
        this.controls.email = form.controls['email'];
        this.controls.senha = form.controls['senha'];
    }
}