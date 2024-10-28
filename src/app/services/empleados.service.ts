import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IAPIResponse} from "./auth.service";

export interface IEmpleado{
  id?: number
  dni: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
  admin: boolean
}

export interface IEmpleadoSend{
  id?: number
  dni: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
  admin: boolean
}

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {
  private apiUrl = 'http://localhost:8085/user';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(`${this.apiUrl}/list`);
  }

  createEmpleado(empleado: IEmpleadoSend): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(this.apiUrl, empleado);
  }

  editarEmpleado(id: number, empleado: IEmpleadoSend): Observable<IAPIResponse>{
    return this.http.put<IAPIResponse>(`${this.apiUrl}/${id}`, empleado)
  }

  eliminarEmpleado(id: number): Observable<IEmpleado>{
    return this.http.delete<IEmpleado>(`${this.apiUrl}/${id}`);
  }
}
