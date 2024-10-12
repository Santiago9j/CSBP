import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface RowAction {
    label: string;
    method: (row: any) => void;
    condition: (row: any) => boolean;
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [NgFor, NgIf],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {
    @Input() title: string = '';
    @Input() columns: any = [];
    @Input() info: any = [];
    @Input() rowActions: RowAction[] = [];
    keys: any[] = [];
    rol: string | null = '';

    ngOnInit() {
        if (this.info.length > 0) {
            this.keys = Object.keys(this.info[0]);
            this.rol = localStorage.getItem('rol');
        }
    }
}
