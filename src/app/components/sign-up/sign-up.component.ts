import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  register!: FormGroup;

  ngOnInit(): void {
    this.register = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      contrasena: new FormControl('',[Validators.required]),
      confirmarContrasena: new FormControl('',[Validators.required])
    })   
  }

  submit(){
    if (this.register.valid){
      console.log("Formulario de register listo.")
    }
  }
}
