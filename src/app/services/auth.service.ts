import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ILogin {
  id: number
  dni: number
  nombre: number
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
  admin: boolean
}

export interface ILoginSend {
  email: string
  password: string
}

export interface IRegister {
  id: number
  dni: number
  nombre: number
  primerApellido: string
  segundoApellido: string
  email: string
  active: boolean
  admin: boolean

}

export interface IRegisterSend {
  dni: string,
  nombre: string,
  primerApellido: string
  segundoApellido: string
  email: string
  password: string
}

export interface IAPIResponse {
  success: boolean
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(login: ILoginSend): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.apiUrl}/login`, login);
  }

  register(register: IRegisterSend): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${this.apiUrl}/register`, register);
  }
}
