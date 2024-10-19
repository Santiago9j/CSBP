import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() modulos:any = [];

  constructor(private router: Router) {
  }

  signOut(): void {
    sessionStorage.removeItem("user");
    this.router.navigate(['/login'])
  }
}
