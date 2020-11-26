import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root',
})


export class ValidadoresService {
  constructor() {}

  existeUsuario(control): Promise <ErrorValidate> | Observable <ErrorValidate> {
  
    if(!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout( () => {
          if ( control.value === 'mabvmex') {
            resolve({ existe: true});
          } else {  
            resolve (null)
          } 
      }, 3500)
    });
  }

  noHerrera(control: FormControl): ErrorValidate {
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
