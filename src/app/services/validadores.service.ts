import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() { }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    }
    return null;
  }

  passwordsIguales(passwordValidation: string, repeatPasswordValidation: string) {
    return (formGroup: FormGroup) => {

      const passwordControl = formGroup.controls[passwordValidation];
      const repeatPasswordControl = formGroup.controls[repeatPasswordValidation];

      if (passwordControl.value === repeatPasswordControl.value) {
        repeatPasswordControl.setErrors(null);
      } else {
        repeatPasswordControl.setErrors({ noEsIgual: true })
      }
    };
  }
}
