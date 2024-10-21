import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements OnChanges{
  @Input() title: string = '';
  @Input() columns:any = [];
  @Input() info:any[]  = []
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Output() viewDetails = new EventEmitter<string>();

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  buscar :string = '';
  filtro: any[] = [];
  keys:any[] = []
  rol:string|null = "";

  ngOnChanges() {
    console.log("Info "+this.info)
    if (this.info.length > 0) {
      this.keys = Object.keys(this.info[0]);
      console.log("Keys: "+this.keys)
      this.rol = localStorage.getItem("rol");
      this.filtro = this.info
    }else{
      console.log("Inc")
    }
  }

  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(body:any) {
    this.delete.emit(body);
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

  limpiarModal(): void {
      this.close.emit()
  }

  filtrar(): void {
    if (this.buscar) {
      const buscarCase = this.buscar.toLowerCase();
      this.filtro = this.info.filter(item =>
        this.keys.some(key =>
          String(item[key]).toLowerCase().includes(buscarCase)
        )
      );
    } else {
      this.filtro = this.info;
    }
  }

  viewDetailsRow(codigo: string) {
    this.viewDetails.emit(codigo);
  }
}

