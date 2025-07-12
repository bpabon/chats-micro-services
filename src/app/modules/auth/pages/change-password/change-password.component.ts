import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordComplexityValidator } from '../../../../core/utils/password-helpers';
import { ToastService } from '../../../../core/services/toast.service';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { changePasswordInterface, ValidToken } from '../../models/auth-http';
@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    ButtonComponent,
    SkeletonLoaderComponent,
    NgClass,
    AngularSvgIconModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  token: string | null = null;
  isSkeletonLoader = true;
  form!: FormGroup;
  passwordStrength: boolean[] = [false, false, false, false];
  passwordTextType!: boolean;
  verifyPasswordTextType: boolean = false;
  submitted = false;
  isSubmit = false;
  tokenIsValid!: ValidToken;
  invalidToken = false;
  private authService = inject(AuthService);
  private _alert = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private _route = inject(Router);
  constructor(
    private route: ActivatedRoute,
    private readonly _formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.form = this._formBuilder.group({
      password: ['', [Validators.required, passwordComplexityValidator]],
      verify_password: ['', Validators.required],
    });
    this.form.get('password')?.valueChanges.subscribe((value: string) => {
      this.checkPasswordStrength(value || '');
    });
  }
  ngAfterViewInit() {
    this.authService
      .checkValidJwtToken(this.token?.toString() ?? '')
      .subscribe({
        next: (data: ValidToken) => {
          this.tokenIsValid = data;
          if (!this.tokenIsValid.token) {
            this.invalidToken = true;
          }
          this.isSkeletonLoader = false;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status > 500) {
            return this._alert.error(
              error.error?.error?.message ?? error.message
            );
          }
          return this._alert.warning(
            error.error?.error?.message ?? error.message
          );
        },
      });
  }
  get f() {
    return this.form.controls;
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
    if (this.form.value.password !== this.form.value.verify_password) {
      this._alert.info('Las contraseñas no coinciden');
      return;
    }
    this.isSubmit = true;
    let myForm:changePasswordInterface = this.form.value;
    this.authService.changePassoword(myForm, this.token?.toString() ?? '').subscribe({
      next: (data) => {
        this.isSubmit = false;
        this._alert.success(data?.msg?.toString() ?? '');
        this._route.navigate(['/auth/sign-in']);
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
  }
}
