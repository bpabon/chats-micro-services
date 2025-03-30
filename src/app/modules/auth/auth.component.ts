import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router'; // 👈 Importa esto


@Component({
  selector: 'app-auth',
  standalone: true, // 👈 Especifica que es standalone
  imports: [AngularSvgIconModule,RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {

}
