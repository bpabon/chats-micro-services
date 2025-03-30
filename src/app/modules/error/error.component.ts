import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 Importa esto

@Component({
  selector: 'app-error',
  imports: [RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
