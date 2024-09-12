import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TableComponent } from "../../components/table/table.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, HeaderComponent, TableComponent],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css'
})

export class MainComponent {
}
