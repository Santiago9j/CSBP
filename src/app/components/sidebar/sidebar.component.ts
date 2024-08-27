import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavbarComponent, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
