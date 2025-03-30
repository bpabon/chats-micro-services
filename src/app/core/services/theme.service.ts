import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { effect } from '@angular/core';
import { Theme } from '../models/theme.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({ mode: 'dark', color: 'base' });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTheme();
    effect(() => {
      this.setTheme();
    });
  }

  private loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.theme.set(JSON.parse(theme));
      }
    }
  }

  private setTheme() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', JSON.stringify(this.theme()));
      this.setThemeClass();
    }
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }

  private setThemeClass() {
    document.querySelector('html')!.className = this.theme().mode;
    document
      .querySelector('html')!
      .setAttribute('data-theme', this.theme().color);
  }
}
