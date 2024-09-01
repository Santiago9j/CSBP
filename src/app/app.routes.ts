import { Routes } from '@angular/router';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main-component/main-component.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'registrate', component: SignUpComponent},
    {path: '', component: MainComponent ,
        children: [
            { path: '', redirectTo: 'ventas', pathMatch: 'full' },
            {path: 'ventas', component: VentasComponent},
            {path: 'productos', component: ProductosComponent},
            {path: 'clientes', component: ClientesComponent},
            {path: 'empleados', component: EmpleadosComponent}
        ]
    },
];
