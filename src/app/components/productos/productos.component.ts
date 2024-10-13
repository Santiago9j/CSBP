import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProducto, IProductoSend, ProductosService } from '../../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  productos: IProducto[] = []
  productsForm!: FormGroup;
  editando = false;
  productoEditadoId: number | null = null;

  constructor(private productoService: ProductosService) {
    this.getProductos();
  }



  ngOnInit(): void {
    this.productsForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required]),
      cantidadDisponible: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }


  getProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: IProducto[]) => {
        this.productos = data;
      },
      (error: any) => {
        this.productos = []
      }
    )
  }

  submit() {
    if (this.productsForm.valid) {
      let producto: IProductoSend = {
        nombre: this.productsForm.get("nombre")?.value,
        marca: this.productsForm.get("marca")?.value,
        costo: this.productsForm.get("costo")?.value,
        cantidad: this.productsForm.get("cantidadDisponible")?.value,
        activo: parseInt(this.productsForm.get("estado")?.value)
      }


      if (this.editando && this.productoEditadoId !== null) {
        this.productoService.editarProducto(this.productoEditadoId, producto).subscribe(
          () => {
            console.log("Producto actualizado con éxito");
            this.getProductos(); 
            this.editando = false;
            this.productoEditadoId = null;
          },
          (error: any) => {
            console.error("No se pudo actualizar.... " + error);
          }
        );

        this.cerrarModal(); 
      } else {
        this.productoService.createProducto(producto).subscribe(
          (data: IProducto) => {
            console.log(JSON.stringify(data));
            this.getProductos(); 
          },
          (error: any) => {
            console.error("No se pudo insertar.... " + error);
          }
        );

        this.productsForm.reset();
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
    this.productsForm.reset(); 
    this.editando = false; 
    this.productoEditadoId = null;
  }


  onEdit(producto: IProducto) {
    this.abrirModal()
    this.productsForm.patchValue({
      nombre: producto.nombre,
      marca: producto.marca,
      costo: producto.costo,
      cantidadDisponible: producto.cantidad,
      estado: producto.activo ? 1 : 0
    });
    this.editando = true;
    this.productoEditadoId = producto.id;
  }

  onDelete(data:IProducto) {
    this.productoService.eliminarProducto(data['id'], data).subscribe(() => {
      this.getProductos();
    });
  }
}
