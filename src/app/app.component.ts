import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './core/shared/components/responsive-helper/responsive-helper.component';

@Component({
  selector: 'app-root',
  imports:[NgxSonnerToaster, RouterOutlet, ResponsiveHelperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chats-micro-services';
  constructor(public themeService: ThemeService) {}
}
