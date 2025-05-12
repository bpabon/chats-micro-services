import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { passwordComplexityValidator } from '../../../../core/utils/password-helpers';
import { ToastService } from '../../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginHttp as RegisterHttpInterface } from '../../models/auth-http';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    RouterLink,
    AngularSvgIconModule,
    ButtonComponent,
    SkeletonLoaderComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  isSkeletonLoader = true;
  form!: FormGroup;
  passwordStrength: boolean[] = [false, false, false, false];
  submitted = false;
  isSubmit = false;
  passwordTextType!: boolean;
  verifyPasswordTextType: boolean = false;
  private authService = inject(AuthService);
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _alert: ToastService
  ) {}
  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordComplexityValidator]],
      verifyPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
    this.form.get('password')?.valueChanges.subscribe((value: string) => {
      this.checkPasswordStrength(value || '');
    });
    this.isSkeletonLoader = false;
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  checkPasswordStrength(password: string): void {
    this.passwordStrength = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[\W_]/.test(password),
    ];
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.password !== this.form.value.verifyPassword) {
      this._alert.info('Las contraseñas no coinciden');
      return;
    }
    const { email, password } = this.form.value;
    this.isSubmit = true;
    let myForm:RegisterHttpInterface = { email, password };
    this.authService.postRegister(myForm).subscribe({
      next: (data) => {
        this.isSubmit = false;
        this._alert.success(data.msg);
        this._router.navigate(['/auth/sign-in']);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmit = false;
        console.log(error.error);
        if(error.status > 500 ){
          return this._alert.error(error.error?.error?.message ?? error.message);
        }
        return this._alert.warning(error.error?.error?.message ?? error.message);
      },
    });
    // service
  }
  term() {
    this._alert.custom(
      'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    );
  }
}
