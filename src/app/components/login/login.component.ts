import { CommonModule } from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {AuthService, ILogin, ILoginSend} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required])
      })
  }

  submit(){
    if (!this.loginForm.valid) return;

    const user = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
    } as ILoginSend;

    this.authService.login(user).subscribe(
      (data: ILogin) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/ventas']);
      },
      (error: any) => {
        this.snackBar.open('Credenciales invalidas', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: "assertive"
        });
        console.error(error);
      }
    );
  }
}
