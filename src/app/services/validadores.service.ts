import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    }
    return null;
  }

  passwordsIguales(password: string, repeatPassword: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls.password;
      const pass2Control = formGroup.controls.repeatPassword;

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
