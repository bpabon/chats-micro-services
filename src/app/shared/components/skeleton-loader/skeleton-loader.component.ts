import { Component,input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.css'
})
export class SkeletonLoaderComponent {
  lines = input<number>(3); // Cantidad de líneas
  showCircle = input<boolean>(false); // Mostrar círculo tipo avatar
  lineHeight = input<string>('h-4'); // Altura de línea
  lineWidth = input<string>('w-full'); // Anchura de línea
}

