import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService, ICliente, IClienteSend } from '../../services/clientes.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  clientes: ICliente[] = []
  clienteForm!: FormGroup;
  editando = false;
  clienteEditadoId: number | null = null;

  constructor(private clienteService: ClientesService, private snackBar: MatSnackBar) {
    this.getClientes();
  }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required])
    })
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data: ICliente[]) => {
        this.clientes = data;
      },
      (error: any) => {
        this.clientes = []
        this.snackBar.open('Lo siento, no se puedo listar la información de los clientes', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'assertive',
          panelClass: ['custom-snackbar']
        });
      }
    )
  }


  submit() {
    if (this.clienteForm.valid) {
      let cliente: IClienteSend = {
        dni: this.clienteForm.get("dni")?.value,
        nombre: this.clienteForm.get("nombre")?.value,
        primerApellido: this.clienteForm.get("primerApellido")?.value,
        segundoApellido: this.clienteForm.get("segundoApellido")?.value,
        active: this.clienteForm.get("active")?.value == "true" ? true : false
      }

      if (this.editando && this.clienteEditadoId !== null) {
        let clienteSend: ICliente = {
          ...cliente,
          id: this.clienteEditadoId
        }

        let clientesSinActual = this.clientes.filter((c) => c.id != this.clienteEditadoId)
        let isCliente = clientesSinActual.some(
          (p) => p.dni === clienteSend.dni
        );

        if (!isCliente) {
          this.clienteService.editarCliente(this.clienteEditadoId, clienteSend).subscribe(
            () => {
              this.getClientes();
              this.editando = false;
              this.clienteEditadoId = null;
              this.snackBar.open('El cliente se ha actualizado', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            },
            (error: any) => {
              this.snackBar.open('No se puedo actualizar al cliente', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            }
          );
          this.cerrarModal();
        } else {
          this.snackBar.open('Lo siento, ya existe un cliente con ese mismo NIT', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: 'assertive',
            panelClass: ['custom-snackbar']
          });
        }
      } else {
        let isCliente = this.clientes.some(
          (p) => p.dni === cliente.dni
        );

        if (!isCliente) {
          this.clienteService.createCliente(cliente).subscribe(
            (data: ICliente) => {
              this.getClientes();
              this.snackBar.open('El cliente se ha creado', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            },
            (error: any) => {
              this.snackBar.open('No se pudo insertar al cliente', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            }
          );
          this.clienteForm.reset();
          this.cerrarModal();
        } else {
          this.snackBar.open('Lo siento, ya existe un cliente con ese mismo NIT', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: 'assertive',
            panelClass: ['custom-snackbar']
          });
        }
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
    this.clienteForm.reset();
    this.editando = false;
    this.clienteEditadoId = null;
  }


  onEdit(cliente: ICliente) {
    this.abrirModal()
    this.clienteForm.patchValue({
      dni: cliente.dni,
      nombre: cliente.nombre,
      primerApellido: cliente.primerApellido,
      segundoApellido: cliente.segundoApellido,
      active: cliente.active ? "true" : "false"
    });
    this.editando = true;
    this.clienteEditadoId = cliente.id;
  }

  onDelete(data: ICliente) {
    this.clienteService.eliminarCliente(data['id'], data).subscribe(() => {
      this.getClientes();
    });
  }
}