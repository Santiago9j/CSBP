import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements OnChanges{
  @Input() title: string = '';
  @Input() columns:any = [];
  @Input() info:any[]  = []
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<{id:number, body:any}>();
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  keys:any[] = []
  rol:string|null = "";

  ngOnChanges() {
    console.log("Info "+this.info)
    if (this.info.length > 0) {
      this.keys = Object.keys(this.info[0]);
      console.log("Keys: "+this.keys)
      this.rol = localStorage.getItem("rol");
    }else{
      console.log("Inc")
    }
  }

  editRow(row: any) {
    this.edit.emit(row);
  }
  
  deleteRow(id:number, body:any) {
    this.delete.emit({id,body});
  }

  abrirModal(): void {
    if (this.modal) {
      this.modal.nativeElement.showModal();
    }
  }

  cerrarModal(): void {
    if (this.modal) {
      this.modal.nativeElement.close();
    }
  }
}

