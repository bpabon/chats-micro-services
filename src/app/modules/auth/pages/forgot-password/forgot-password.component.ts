import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ToastService } from '../../../../core/services/toast.service';
import { NgClass, NgIf } from '@angular/common';
import { LoginHttp } from '../../models/auth-http';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    RouterLink,
    ButtonComponent,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  private authService = inject(AuthService);
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private _alert: ToastService
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const payload: Omit<LoginHttp, 'password'> = this.form.value;
    this.authService.forgotPassword(payload).subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this._alert.success(data.msg);
        this._router.navigate(['/auth/sign-in']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if(error.status > 500 ){
          return this._alert.error(error.error?.error?.message ?? error.message);
        }
        return this._alert.warning(error.error?.error?.message ?? error.message);
      },
    });
  }
}
