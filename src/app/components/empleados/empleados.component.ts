import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EmpleadosService, IEmpleado, IEmpleadoSend} from "../../services/empleados.service";
import {IAPIResponse, ILogin} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
  user : ILogin | null = null;

  constructor(
    private empleadoService: EmpleadosService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getEmpleados();
  }

  ngOnInit(): void {
    this.empleadosForm = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', [Validators.required])
    })

    const userJson = JSON.parse(sessionStorage.getItem("user") || "");
    this.user = userJson as ILogin || null;
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
    if (!this.empleadosForm.valid) return;

    const empleado = {
      dni: this.empleadosForm.get("dni")?.value,
      nombre: this.empleadosForm.get("nombre")?.value,
      primerApellido: this.empleadosForm.get("primerApellido")?.value,
      segundoApellido: this.empleadosForm.get("segundoApellido")?.value,
      email: this.empleadosForm.get("email")?.value,
      active: Boolean(parseInt(this.empleadosForm.get("active")?.value)),
      admin: Boolean(parseInt(this.empleadosForm.get("isAdmin")?.value)),
    } as IEmpleadoSend;

    if (this.editando && this.empleadoEditadoId) {
      this.empleadoService.editarEmpleado(this.empleadoEditadoId as number, empleado).subscribe(
        (data: IAPIResponse) => {
          if (data.success) {
            this.getEmpleados();
            this.editando = false;
            this.empleadoEditadoId = undefined;
            this.cerrarModal();
          }

          this.snackBar.open(data.message, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: "assertive"
          });

        },
        (error: any) => {
          this.snackBar.open('Hubo un error al actualizar', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: "assertive"
          });
        }
      );

      return;
    }

    this.empleadoService.createEmpleado(empleado).subscribe(
      (data: IAPIResponse) => {
        this.snackBar.open(data.message, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });

        if (data.success) {
          this.empleadosForm.reset();
          this.cerrarModal();
          this.getEmpleados();
        }
      },
      (error: any) => {
        this.snackBar.open('No se pudo agregar', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });
        this.getEmpleados();
      }
    );
  }

  abrirModal(): void {
    if (this.tableComponent) {
      this.tableComponent.abrirModal();
    }
  }

  cerrarModal(): void {
    this.empleadosForm.reset();
    this.editando = false;
    this.empleadoEditadoId = undefined;
    this.tableComponent.cerrarModal();
  }

  onEdit(empleado: IEmpleado) {
    this.abrirModal()

    this.empleadosForm.patchValue({
      dni: empleado.dni,
      nombre: empleado.nombre,
      primerApellido: empleado.primerApellido,
      segundoApellido: empleado.segundoApellido,
      email: empleado.email,
      active: empleado.active ? "1" : "0",
      isAdmin: empleado.admin ? "1" : "0"
    });

    this.editando = true;
    this.empleadoEditadoId = empleado.id;
  }

  onDelete({ id }: { id: number, body: any }) {
    this.empleadoService.eliminarEmpleado(id).subscribe(() => {
      if (id == this.user?.id) {
        sessionStorage.removeItem("user");
        this.router.navigate(['/login'])
        return;
      }

      this.getEmpleados();
    });
  }

}
