import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private bf: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void { }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  crearFormulario() {
    this.forma = this.bf.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', Validators.required  ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')], ],
      // tslint:disable-next-line: max-line-length
      // correo: ['a@a.co', [Validators.required, Validators.pattern('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/')], ],
    });
    }

    guardar(){
      console.log(this.forma.value);

      if(this.forma.invalid) {
        return Object.values( this.forma.controls ).forEach(control => {
          control.markAsTouched();
        });
      }
    }
}
