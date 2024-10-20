import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO Update
export interface IVenta {
  id: number;
}

export interface IVentaSend {
  clienteId: number
  empleadoId: number
  productos: {
    id: number
    cantidad: number
  }[];
}

// TODO Render table
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost:8080/venta';

  constructor(private http: HttpClient) { }

  getVentas(): Observable<IVenta[]> {
    return this.http.get<IVenta[]>(`${this.apiUrl}/all`);
  }

  createVenta(producto: IVentaSend): Observable<IVenta> {
    return this.http.post<IVenta>(this.apiUrl, producto);
  }

}
