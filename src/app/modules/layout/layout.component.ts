import { Component, Inject, AfterViewChecked } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewChecked {  
  private mainContent: HTMLElement | null = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.mainContent) {
      this.mainContent = this.document.getElementById('main-content');
    }
  }
}
