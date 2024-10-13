import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService, ICliente, IClienteSend } from '../../services/clientes.service';

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


  constructor(private clienteService:ClientesService){
    this.getClientes();

  }

  ngOnInit(): void {
      this.clienteForm = new FormGroup({
        dni : new FormControl('',[Validators.required]),
        nombre: new FormControl('',[Validators.required]),
        primerApellido: new FormControl('',[Validators.required]),
        segundoApellido: new FormControl('',[Validators.required]),
        active: new FormControl('',[Validators.required])
      })
  }

  getClientes():void{
    this.clienteService.getClientes().subscribe(
      (data: ICliente[]) => {
        this.clientes = data;
      },
      (error: any) => {
        this.clientes = []
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
        active: this.clienteForm.get("active")?.value  == "true" ? true : false
      }


      if (this.editando && this.clienteEditadoId !== null) {
        let clienteSend:ICliente = {
          ...cliente,
          id: this.clienteEditadoId
        }
        this.clienteService.editarCliente(this.clienteEditadoId, clienteSend).subscribe(
          () => {
            this.getClientes(); 
            this.editando = false;
            this.clienteEditadoId = null;
          },
          (error: any) => {
            console.error("No se pudo actualizar.... " + error);
          }
        );

        this.cerrarModal(); 
      } else {
        this.clienteService.createCliente(cliente).subscribe(
          (data: ICliente) => {
            this.getClientes(); 
          },
          (error: any) => {
            console.error("No se pudo insertar.... " + error);
          }
        );

        this.clienteForm.reset();
        this.cerrarModal(); 
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

  onDelete(data:ICliente) {
    this.clienteService.eliminarCliente(data['id'], data).subscribe(() => {
      this.getClientes();
    });
  }

}
