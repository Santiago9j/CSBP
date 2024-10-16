import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEmpleado{
  id?: number
  dni: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
}

export interface IEmpleadoSend{
  id?: number
  dni: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
}

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(`${this.apiUrl}/list`);
  }

  createEmpleado(empleado: IEmpleadoSend): Observable<IEmpleado> {
    return this.http.post<IEmpleado>(this.apiUrl, empleado);
  }

  editarEmpleado(id: number, empleado: IEmpleado): Observable<IEmpleado>{
    return this.http.put<IEmpleado>(`${this.apiUrl}/${id}`, empleado)
  }

  eliminarEmpleado(id: number): Observable<IEmpleado>{
    return this.http.delete<IEmpleado>(`${this.apiUrl}/${id}`);
  }
}
