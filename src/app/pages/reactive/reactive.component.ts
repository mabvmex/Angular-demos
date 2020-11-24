import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {}

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get nombreValido() {
    return this.forma.get('nombre').valid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  get apellidoValido() {
    return (
      this.forma.get('apellido').valid && this.forma.get('apellido').touched
    );
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get correoValido() {
    return this.forma.get('correo').valid && this.forma.get('correo').touched;
  }

  get coloniaNoValido() {
    return (
      this.forma.get('direccion.colonia').invalid &&
      this.forma.get('direccion.colonia').touched
    );
  }

  get coloniaValido() {
    return (
      this.forma.get('direccion.colonia').valid &&
      this.forma.get('direccion.colonia').touched
    );
  }

  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  get ciudadValido() {
    return (
      this.forma.get('direccion.ciudad').valid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      direccion: this.fb.group({
        colonia: ['', [Validators.required, Validators.minLength(2)]],
        ciudad: ['', [Validators.required, Validators.minLength(2)]],
      }),
      pasatiempos: this.fb.array([
        
      ])
    });
  }

  cargarDataAlFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Miguel',
      apellido: 'Barrera',
      correo: 'mabvmet@gmail.com',
      direccion: {
        colonia: 'Centro',
        ciudad: 'Tula',
      },
    });
  }


  agregarPasatiempo( ) {
    this.pasatiempos.push(this.fb.control('', []));
  }

  borrarPasariempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAllAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    // posteo de la información
    this.forma.reset({
      nombre: 'Ahora nombre',
    });
  }
}
