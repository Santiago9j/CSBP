import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productsForm!: FormGroup

  ngOnInit(): void {
      this.productsForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        marca: new FormControl('', [Validators.required]),
        costo: new FormControl('', [Validators.required]),
        cantidadDisponible: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required])
      });
  }

  submit (){
    console.log("Hola productos")
    if (this.productsForm.valid){
      console.log("El formulario producto cumple con los requisitos")
    }
  }
}
