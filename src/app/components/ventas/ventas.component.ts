import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  venta!: FormGroup;

  ngOnInit(): void {
      this.venta = new FormGroup({
        cliente: new FormControl('',[Validators.required]),
        producto: new FormControl('',[Validators.required]),
        cantidad: new FormControl('',[Validators.required, Validators.min(1)])
      })
  }

  add(){
    if (this.venta.valid){
      console.log("Venta")
    }
  }

  submit(){
    if (this.venta.valid){
      console.log("send")
    }
  }

}
