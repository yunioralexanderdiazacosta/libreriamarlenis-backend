import { FormGroup } from '@angular/forms';

export function Coincidencia(campo1: string, campo2: string)
{
	return (formGroup: FormGroup) => {
		const texto1 = formGroup.controls[campo1];
		const texto2 = formGroup.controls[campo2];

		if(texto2.errors && !texto2.errors.coincidencia){
			return;
		}

		if(texto1.value !== texto2.value){
			texto2.setErrors({ coincidencia: true });
		} else {
			texto2.setErrors(null);
		}
	}
}