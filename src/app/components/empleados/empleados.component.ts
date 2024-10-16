import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EmpleadosService, IEmpleado, IEmpleadoSend} from "../../services/empleados.service";

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent implements OnInit {
  empleadosForm!: FormGroup;
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  empleados: IEmpleado[] = []
  editando = false;
  empleadoEditadoId?: number = undefined;

  constructor(private empleadoService: EmpleadosService, private cdr: ChangeDetectorRef) {
    this.getEmpleados();
  }

  ngOnInit(): void {
    this.empleadosForm = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required])
    })
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data: IEmpleado[]) => {
        this.empleados = data;
      },
      (error: any) => {
        console.log("No hay data")
        this.empleados = []
      }
    )
  }

  submit() {
    if (this.empleadosForm.valid) {
      const empleado = {
        dni: this.empleadosForm.get("dni")?.value,
        nombre: this.empleadosForm.get("nombre")?.value,
        primerApellido: this.empleadosForm.get("primerApellido")?.value,
        segundoApellido: this.empleadosForm.get("segundoApellido")?.value,
        email: this.empleadosForm.get("email")?.value,
        active: Boolean(parseInt(this.empleadosForm.get("active")?.value))
      } as IEmpleadoSend;

      if (this.editando && this.empleadoEditadoId) {
        this.empleadoService.editarEmpleado(this.empleadoEditadoId as number, empleado).subscribe(
          () => {
            console.log("Empleado actualizado con éxito");
            this.getEmpleados();
            this.editando = false;
            this.empleadoEditadoId = undefined;
          },
          (error: any) => {
            console.error("No se pudo actualizar.... " + error);
          }
        );
        this.cerrarModal();
      } else {
        this.empleadoService.createEmpleado(empleado).subscribe(
          (data: IEmpleado) => {
            this.getEmpleados();
          },
          (error: any) => {
            console.error("No se pudo insertar.... " + error);
          }
        );
        this.empleadosForm.reset();
        this.cerrarModal();
        this.getEmpleados();
      }
    }
  }

  abrirModal(): void {
    if (this.tableComponent) {
      this.tableComponent.abrirModal();
    }
  }

  cerrarModal(): void {
    if (this.tableComponent) {
      this.tableComponent.cerrarModal();
    }
    this.empleadosForm.reset();
    this.editando = false;
    this.empleadoEditadoId = undefined;
  }

  onEdit(empleado: IEmpleado) {
    this.abrirModal()

    this.empleadosForm.patchValue({
      dni: empleado.dni,
      nombre: empleado.nombre,
      primerApellido: empleado.primerApellido,
      segundoApellido: empleado.segundoApellido,
      email: empleado.email,
      active: empleado.active ? "1" : "0"
    });

    this.editando = true;
    this.empleadoEditadoId = empleado.id;
  }

  onDelete({ id }: { id: number, body: any }) {
    this.empleadoService.eliminarEmpleado(id).subscribe(() => {
      this.getEmpleados();
    });
  }

}
