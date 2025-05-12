import { Injectable } from '@angular/core';
import { toast as _toaster } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  success(message: string, description?: string) {
    _toaster.success(message, { description });
  }

  error(message: string, description?: string) {
    _toaster.error(message, { description });
  }

  info(message: string, description?: string) {
    _toaster.info(message, { description });
  }

  warning(message: string, description?: string) {
    _toaster.warning(message, { description });
  }

  custom(message: string, options?: Partial<{ description: string; duration: number }>) {
    _toaster.message(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
    });
  }
}
