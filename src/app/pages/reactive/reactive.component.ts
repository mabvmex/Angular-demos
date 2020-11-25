import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    // this.cargarDataAlFormulario();
  }

  ngOnInit(): void {}

  get pasatiempos() { return this.forma.get('pasatiempos') as FormArray; }

  get nombreValido()   { return this.forma.get('nombre').valid && this.forma.get('nombre').touched; }
  get nombreNoValido() { return this.forma.get('nombre').invalid && this.forma.get('nombre').touched; }

  get apellidoValido()   { return ( this.forma.get('apellido').valid && this.forma.get('apellido').touched ); }
  get apellidoNoValido() { return ( this.forma.get('apellido').invalid && this.forma.get('apellido').touched ); }

  get correoValido()   { return this.forma.get('correo').valid && this.forma.get('correo').touched; }
  get correoNoValido() { return this.forma.get('correo').invalid && this.forma.get('correo').touched; }

  get coloniaValido()   { return this.forma.get('direccion.colonia').valid &&  this.forma.get('direccion.colonia').touched; }
  get coloniaNoValido() { return this.forma.get('direccion.colonia').invalid && this.forma.get('direccion.colonia').touched; }

  get ciudadValido()   { return this.forma.get('direccion.ciudad').valid && this.forma.get('direccion.ciudad').touched; }
  get ciudadNoValido() { return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched; }

  get passValido()   { return this.forma.get('pass').valid && this.forma.get('pass').touched; } 
  get passNoValido() { return this.forma.get('pass').invalid && this.forma.get('pass').touched; } 
  
  get repeatPassValido() { return this.forma.get('repeatPass').valid }
  get repeatPassNoValido() { 
    const pass = this.forma.get('pass').value;
    const repeatPass = this.forma.get('repeatPass').value;
    
    return (pass === repeatPass ) ? false : true

  }
    

  crearFormulario() {
    this.forma = this.fb.group({
      nombre:   ['Miguel', [ Validators.required, Validators.minLength(2)] ],
      apellido: [ 'herrerax', [ Validators.required, Validators.minLength(2), this.validadores.noHerrera ] ],
      correo:   [ 'mabvmet@a.com', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ] ],
      pass:     [ 'cinco', [Validators.required, Validators.minLength(5) ] ],
      repeatPass:   [ 'cinco', [Validators.required ] ],
      direccion: this.fb.group({ 
        colonia:  ['Centro', [ Validators.required, Validators.minLength(2)] ], 
        ciudad:   ['Tula', [ Validators.required, Validators.minLength(2)] ]
      }),
      pasatiempos: this.fb.array([]),
    },{
      Validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  cargarDataAlFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Miguel',
      apellido: 'herrera',
      correo: 'mabvmet@gmail.com',
      direccion: {
        colonia: 'Centro',
        ciudad: 'Tula',
      },
    });

    // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo() { this.pasatiempos.push (this.fb.control('', [])) }
  borrarPasatiempo(i: number) { this.pasatiempos.removeAt(i); }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        } else {
            control.markAsTouched();
        }
      });
      // posteo de la información
      // this.forma.reset({
      //   nombre: 'Ahora nombre',
      // });
    }
  }
}






    /* minuto 3:50

    return ( Condición ) ? Si se cumple... False : Si no se cumple... TRUE
    
    */
