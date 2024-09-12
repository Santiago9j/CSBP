import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  cliente!: FormGroup;

  ngOnInit(): void {
      this.cliente = new FormGroup({
        dni : new FormControl('',[Validators.required]),
        nombre: new FormControl('',[Validators.required]),
        primerApellido: new FormControl('',[Validators.required]),
        segundoApellido: new FormControl('',[Validators.required]),
        estado: new FormControl('',[Validators.required])
      })
  }

  submit(){
    if (this.cliente.valid){
      console.log("Formulario de cliente")
    }
  }

}
