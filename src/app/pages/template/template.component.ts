import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Miguel ',
    apellido: 'Barrera',
    email: 'dax@mex.com',
    pais : ''
  };


  paises: any[] = [];


  // tslint:disable-next-line: no-shadowed-variable
  constructor( private PaisService: PaisService ) { }

  ngOnInit(): void {
  this.PaisService.getPaises()
  .subscribe(paises => {
    this.paises = paises;

    this.paises.unshift({
      nombre: '- Seleccione país -',
      codigo: ''
    });

    // console.log('paises =>', paises);
  });

  }

  // tslint:disable-next-line: typedef
  guardar(forma: NgForm ) {
    console.log('forma =>', forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    console.log('forma.value =>', forma.value);
  }


}
