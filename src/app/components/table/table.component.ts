import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements OnInit{
  @Input() title: string = '';
  @Input() columns:any = [];
  @Input() info:any  = []
  keys:any[] = []
  rol:string|null = "";

  ngOnInit() {
    if (this.info.length > 0) {
      this.keys = Object.keys(this.info[0]);
      this.rol = localStorage.getItem("rol");
    }
  }
}

