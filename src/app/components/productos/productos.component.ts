import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProducto, IProductoSend, ProductosService } from '../../services/productos.service';
import { MatSnackBar } from "@angular/material/snack-bar";


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

  constructor(private productoService: ProductosService, private snackBar: MatSnackBar) {
    this.getProductos();
  }

  ngOnInit(): void {
    this.productsForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required]),
      cantidadDisponible: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
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
        this.snackBar.open('Ocurrió un error al traer la información de los productos', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'assertive'
        });
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
        imagen: this.productsForm.get("imagen")?.value,
        activo: parseInt(this.productsForm.get("estado")?.value)
      }

      if (this.editando && this.productoEditadoId !== null) {
        let productosSinActual = this.productos.filter((p) => p.id != this.productoEditadoId)
        let isProduct = productosSinActual.some(
          (p) => p.nombre === producto.nombre && p.marca === producto.marca
        );

        if (!isProduct) {
          this.productoService.editarProducto(this.productoEditadoId, producto).subscribe(
            () => {
              this.snackBar.open('Producto actualizado con éxito', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
              this.getProductos();
              this.editando = false;
              this.productoEditadoId = null;
            },
            (error: any) => {
              this.snackBar.open('No se pudo actualizar.... ', '', {
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
          this.snackBar.open('Lo siento, ya existe un producto con esas características.', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: 'assertive',
            panelClass: ['custom-snackbar']
          });
        }
      } else {
        let isProduct = this.productos.some(
          (p) => p.nombre === producto.nombre && p.marca === producto.marca
        );

        if (!isProduct) {
          this.productoService.createProducto(producto).subscribe(
            (data: IProducto) => {
              this.getProductos();
              this.snackBar.open('El registro se ha guardado', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            },
            (error: any) => {
              this.snackBar.open('No se puedo insertar', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                politeness: 'assertive',
                panelClass: ['custom-snackbar']
              });
            }
          );
          this.productsForm.reset();
          this.cerrarModal();
        } else {
          this.snackBar.open('Lo siento, ya existe un producto con esas características.', '', {
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
    this.productsForm.reset();
    this.editando = false;
    this.productoEditadoId = null;
    this.tableComponent.cerrarModal();
  }


  onEdit(producto: IProducto) {
    this.abrirModal()
    this.productsForm.patchValue({
      nombre: producto.nombre,
      marca: producto.marca,
      costo: producto.costo,
      cantidadDisponible: producto.cantidad,
      imagen: producto.imagen,
      estado: producto.activo ? 1 : 0
    });
    this.editando = true;
    this.productoEditadoId = producto.id;
  }

  onDelete(data: IProducto) {
    this.productoService.eliminarProducto(data['id'], data).subscribe(() => {
      this.getProductos();
    });
  }
}
