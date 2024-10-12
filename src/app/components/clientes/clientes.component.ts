import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [TableComponent, ReactiveFormsModule, CommonModule],
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
    cliente!: FormGroup;
    isEditModalOpen = false;

    ngOnInit(): void {
        this.cliente = new FormGroup({
            dni: new FormControl('', [Validators.required]),
            nombre: new FormControl('', [Validators.required]),
            primerApellido: new FormControl('', [Validators.required]),
            segundoApellido: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required])
        });
    }

    editCliente(row: any): void {
        const { id, name, lastname, lastLastName, estado } = row;

        this.cliente.patchValue({
            dni: id,
            nombre: name,
            primerApellido: lastname,
            segundoApellido: lastLastName,
            estado
        });
        this.isEditModalOpen = true;
    }

    canEditCliente(row: any): boolean {
        return true;
    }

    submit() {
        if (this.cliente.valid) {
            console.log("Formulario de cliente", this.cliente.value);
            this.isEditModalOpen = false;
        }
    }
}
