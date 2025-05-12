import { Injectable, inject, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    const item = this.localStorage?.getItem(key);

    if (!item) {
      return null;
    }

    return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
  }

  set(key: string, value: unknown): void {
    if (this.isBrowser) {
      this.localStorage?.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string): void {
    if (this.isBrowser) {
      this.localStorage?.removeItem(key);
    }
  }

  removeKeys(keys: string[]): void {
    if (this.isBrowser) {
      keys.forEach((key) => this.localStorage?.removeItem(key));
    }
  }

  clear(): void {
    if (this.isBrowser) {
      this.localStorage?.clear();
    }
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
