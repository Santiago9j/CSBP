import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgIf } from '@angular/common';
import {ILogin} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavbarComponent, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  user : ILogin | null = null;

  ngOnInit(): void {
    const userJson = JSON.parse(sessionStorage.getItem("user") || "");
    this.user = userJson as ILogin || null;
  }
}
