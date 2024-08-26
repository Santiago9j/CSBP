import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements OnInit{
  @Input() title: string = '';
  @Input() columns:any = [];
  @Input() info:any  = []
  keys:any[] = []

  ngOnInit() {
    if (this.info.length > 0) {
      this.keys = Object.keys(this.info[0]);
    }
  }
}

