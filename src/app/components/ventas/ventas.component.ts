import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

}
