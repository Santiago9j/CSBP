import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ICliente{
  id: number;
  dni: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  active: boolean;
}

export interface IClienteSend{
  dni: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.apiUrl}/all`);
  }

  createCliente(cliente: IClienteSend): Observable<ICliente> {
    return this.http.post<ICliente>(this.apiUrl, cliente);
  }

  editarCliente(id:number, cliente:ICliente): Observable<ICliente>{
    return this.http.put<ICliente>(`${this.apiUrl}/${id}`, cliente)
  }

  eliminarCliente(id:number,cliente:ICliente): Observable<ICliente>{
    return this.http.delete<ICliente>(`${this.apiUrl}/${id}`,{body: cliente});
  }
}
