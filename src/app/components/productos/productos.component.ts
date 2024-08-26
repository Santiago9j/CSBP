import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

}
