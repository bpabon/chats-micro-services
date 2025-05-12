import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './core/shared/components/responsive-helper/responsive-helper.component';
import { LoadingService } from './core/services/loading.service';
import { LoadingComponent } from './core/shared/components/loading/loading.component';
import { Observable } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports:[NgxSonnerToaster,CommonModule, NgIf,RouterOutlet, ResponsiveHelperComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'chats-micro-services';
  isLoading$!: Observable<boolean>;
  private loadingService = inject(LoadingService);

    constructor(
    public themeService: ThemeService,
    private router: Router,
  ) {   }
  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.loadingService.show();
    //   }

    //   if (
    //     event instanceof NavigationEnd ||
    //     event instanceof NavigationCancel ||
    //     event instanceof NavigationError
    //   ) {
    //     setTimeout(() => {
    //       this.loadingService.hide();
    //     }, 1000);
    //   }
    // });
  }
}
