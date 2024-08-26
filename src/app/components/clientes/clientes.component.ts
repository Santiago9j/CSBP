import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

}
