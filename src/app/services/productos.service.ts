import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IProducto{
  id: number;
  nombre: string;
  marca: string;
  costo: number;
  cantidad: number;
  activo: boolean
}

export interface IProductoSend{
    nombre: string;
    marca: string;
    costo: number;
    cantidad: number;
    activo: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8085/producto';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.apiUrl}/all`);
  }

  createProducto(producto: IProductoSend): Observable<IProducto> {
    return this.http.post<IProducto>(this.apiUrl, producto);
  }

  editarProducto(id:number, producto:IProductoSend): Observable<IProducto>{
    return this.http.put<IProducto>(`${this.apiUrl}/${id}`, producto)
  }

  eliminarProducto(id:number,producto:IProducto): Observable<IProducto>{
    return this.http.delete<IProducto>(`${this.apiUrl}/${id}`,{body: producto});
  }

}
