import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

}
