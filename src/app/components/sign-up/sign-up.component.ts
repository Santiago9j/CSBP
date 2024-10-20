import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, IRegister, IRegisterSend } from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      passwordConfirmation: new FormControl('',[Validators.required]),
    })
  }

  submit(){
    if (!this.registerForm.valid) return;

    const newUser = {
      dni: this.registerForm.get("dni")?.value,
      nombre: this.registerForm.get("nombre")?.value,
      primerApellido: this.registerForm.get("primerApellido")?.value,
      segundoApellido: this.registerForm.get("segundoApellido")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
    } as IRegisterSend;

    this.authService.register(newUser).subscribe(
      (data: IRegister) => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.snackBar.open('Hubo un error al registrarse', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });
        console.error("No se pudo insertar.... " + error);
      }
    );
  }
}
