import { Component } from '@angular/core';
import { timer, windowTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  time = obtenerMensajeSaludo()
  imageProfile:string = "https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
  name: string = "Santiago"
  fullname:string ="Santiago Torres Aguirre"
  email:string = "santitorresaguirre@gmail.com"
}

function obtenerMensajeSaludo ():string{
  let timeNow = new Date().getHours();
  if (timeNow < 12){
    return "Buenos días, "
  } else if (timeNow < 18){
    return "Buenas tardes, "
  } else{
    return "Buenas noches, "
  }
}
