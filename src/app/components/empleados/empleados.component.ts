import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  empleadosForm!: FormGroup;
  
  ngOnInit(): void {
      this.empleadosForm = new FormGroup({
        dni : new FormControl('',[Validators.required]),
        nombres : new FormControl('',[Validators.required]),
        primerApellido : new FormControl('',[Validators.required]),
        segundoApellido : new FormControl('',[Validators.required]),
        fechaNacimiento : new FormControl('',[Validators.required]),
        correo : new FormControl('',[Validators.required]),
        estado : new FormControl('',[Validators.required])
      })
  }

  submit(){
    if (this.empleadosForm.valid){
      console.log("Empleado listo")
    }
  }
}
