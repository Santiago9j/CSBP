import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  login !: FormGroup;

  ngOnInit(): void {
      this.login = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        contrasena: new FormControl('',[Validators.required])
      })
  }

  submit(){
    if (this.login.valid){
      console.log("Form login listo")
    }
  }

}
