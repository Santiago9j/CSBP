import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TableComponent} from "../table/table.component";
import {CommonModule} from "@angular/common";
import {IProducto, ProductosService} from "../../services/productos.service";
import {IVenta, IVentaDetalle, VentasService} from "../../services/ventas.service";
import {ClientesService, ICliente} from "../../services/clientes.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ILogin} from "../../services/auth.service";

interface ISelectedProduct {
  producto: {
    id: number
    nombre: string
    costo: number
  },
  cantidad: number
  subtotal: number
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventaForm!: FormGroup;
  user!: ILogin;
  ventas: IVenta[] = [];
  clientes: ICliente[] = [];
  productos: IProducto[] = [];
  selectedProducts: ISelectedProduct[] = [];
  currentVentaDetalle?: IVentaDetalle
  total: number = 0;

  constructor(
    private productoService: ProductosService,
    private ventaService: VentasService,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar
  ) {
    this.getProductos();
    this.getClientes();
    this.getVentas();
  }

  getVentas(): void {
    this.ventaService.getVentas().subscribe(
      (data: IVenta[]) => {
        this.ventas = data.map(p => ({...p, productos: ''}))
      },
      (error: any) => {
        this.productos = []
      }
    )
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

  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data: ICliente[]) => {
        this.clientes = data;
      },
      (error: any) => {
        this.clientes = []
      }
    )
  }

  getVentaDetalle(codigo: string): void {
    this.ventaService.getVentaDetalle(codigo).subscribe(
      (data: IVentaDetalle) => {
        this.currentVentaDetalle = data;
      },
    )
  }

  openDetailsModal(codigo: string): void {
    this.getVentaDetalle(codigo);
    const modalElement = document.querySelector('#ventaDetalleModal') as HTMLDialogElement;
    modalElement?.showModal();
  }

  ngOnInit(): void {
    const userJson = JSON.parse(sessionStorage.getItem("user") || "");
    this.user = userJson as ILogin;

    this.ventaForm = new FormGroup({
      cliente: new FormControl('', [Validators.required]),
      producto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  addProduct() {
    if (this.ventaForm.valid) {
      const productoId = parseInt(this.ventaForm.get('producto')?.value);
      const producto = this.productos.find(p => p.id === productoId) as IProducto;
      const cantidadNueva = this.ventaForm.get('cantidad')?.value as number;

      const productoExistente = this.selectedProducts.find(p => p.producto.id === productoId);
      const cantidadExistente = productoExistente ? productoExistente.cantidad : 0;

      const cantidadTotal = cantidadExistente + cantidadNueva;

      if (cantidadTotal > producto.cantidad) {
        this.snackBar.open(
          `La cantidad total (${cantidadTotal}) excede el stock disponible (${producto.cantidad}).`,
          'Cerrar',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: 'assertive',
          }
        );
        return;
      }

      if (productoExistente) {
        productoExistente.cantidad += cantidadNueva;
        productoExistente.subtotal = productoExistente.cantidad * producto.costo;
      } else {
        const subtotal = producto.costo * cantidadNueva;
        this.selectedProducts.push({ producto, cantidad: cantidadNueva, subtotal });
      }

      this.total = this.selectedProducts.reduce((acc, item) => acc + item.subtotal, 0);

      this.ventaForm.patchValue({ producto: "", cantidad: "" });
    }
  }
  removeProduct(index: number) {
    const item = this.selectedProducts[index];
    this.total -= item.subtotal;
    this.selectedProducts.splice(index, 1);
  }

  submit() {
    if (this.selectedProducts.length == 0 || !this.ventaForm.get('cliente')?.valid) {
      this.snackBar.open('Agregue por lo menos un producto', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        politeness: "assertive"
      });

      return;
    }

    this.ventaService.createVenta({
      productos: this.selectedProducts.map(p => ({id: p.producto.id, cantidad: p.cantidad})),
      clienteId: this.ventaForm.get('cliente')?.value as number,
      empleadoId: this.user.id,
    }).subscribe(
      (data: IVenta) => {
        this.snackBar.open('Venta registrada con exito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });
        this.closeModal();
        this.getVentas();
      },
      (error: any) => {
        this.snackBar.open('Hubo un error registrando la venta', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });
        console.error(error);
      }
    )
  }

  closeModal() {
    // @ts-ignore
    window.modal.close();
    this.ventaForm.reset();
  }

  closeDetailsModal() {
    // @ts-ignore
    window.ventaDetalleModal.close();
    this.ventaForm.reset();
  }

  calculateTotal(productos: IVentaDetalle["productos"] | undefined): number {
    if (!productos) return 0;

    return productos.reduce((acc, item) => acc + item.subtotal, 0);
  }
}
