import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void { }

  // tslint:disable-next-line: typedef
  get nombreNoValido() { return this.forma.get('nombre').invalid && this.forma.get('nombre').touched; }
  // tslint:disable-next-line: typedef
  get nombreValido() { return this.forma.get('nombre').valid && this.forma.get('nombre').touched; }


  // tslint:disable-next-line: typedef
  get apellidoNoValido() {
    return (this.forma.get('apellido').invalid && this.forma.get('apellido').touched);
  }
  // tslint:disable-next-line: typedef
  get apellidoValido() {
    return (this.forma.get('apellido').valid && this.forma.get('apellido').touched);
  }


  // tslint:disable-next-line: typedef
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  // tslint:disable-next-line: typedef
  get correoValido() {
    return this.forma.get('correo').valid && this.forma.get('correo').touched;
  }


  // tslint:disable-next-line: typedef
  get coloniaNoValido() {
    return (
      this.forma.get('direccion.colonia').invalid && this.forma.get('direccion.colonia').touched
    );
  }
  // tslint:disable-next-line: typedef
  get coloniaValido() {
    return this.forma.get('direccion.colonia').valid && this.forma.get('direccion.colonia').touched;
  }


  // tslint:disable-next-line: typedef
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  // tslint:disable-next-line: typedef
  get ciudadValido() {
    return this.forma.get('direccion.ciudad').valid && this.forma.get('direccion.ciudad').touched;
  }

  // tslint:disable-next-line: typedef
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        colonia: ['', [Validators.required, Validators.minLength(2)]],
        ciudad: ['', [Validators.required, Validators.minLength(2)]],
      }),
    });
  }

  // tslint:disable-next-line: typedef
  guardar() {

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
