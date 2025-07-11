import { Injectable, signal, Inject, PLATFORM_ID, effect } from '@angular/core';
import { Theme } from '../models/theme.model';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({ mode: 'light', color: 'base' });
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorage: LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadTheme();

      effect(() => {
        this.setTheme();
      });
    }
  }

  async loadTheme(): Promise<void> {
    if (!this.isBrowser) return;

    const theme = this.localStorage.get('theme');
    if (typeof theme === 'string') {
      try {
        this.theme.set(JSON.parse(theme));
      } catch {
        this.theme.set({ mode: 'dark', color: 'base' });
      }
    }
  }

  private setTheme(): void {
    if (!this.isBrowser) return;

    this.localStorage.set('theme', JSON.stringify(this.theme()));
    this.setThemeClass();
  }

  private setThemeClass(): void {
    if (!this.isBrowser) return;

    const html = document.querySelector('html');
    if (html) {
      html.className = this.theme().mode;
      html.setAttribute('data-theme', this.theme().color);
    }
  }

  public get isDark(): boolean | null {
    if (!this.isBrowser) return null;
    return this.theme().mode === 'dark';
  }
}
