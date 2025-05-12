import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../modules/auth/services/auth.service';

@Component({
  standalone: true,
  template: '', // No se muestra nada en pantalla
})
export class RedirectComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {

    const isLogged = await this.authService.isLoggedIn().toPromise();

    if (isLogged) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
