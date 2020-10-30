import { FormGroup } from "@angular/forms";

export class FormBuilderUtil {

    public static parseForEntity<T>(form : FormGroup, objeto : T) : T {
        Object.keys(form.controls).forEach( key => {
            objeto[key] = form.controls[key].value;
        });

        return objeto;
    }

}