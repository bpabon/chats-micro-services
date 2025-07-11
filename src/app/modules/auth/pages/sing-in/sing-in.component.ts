import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {SkeletonLoaderComponent} from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginHttp } from '../../models/auth-http';
import { ToastService } from '../../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-sing-in',
  imports: [FormsModule, SkeletonLoaderComponent, RouterLink,ReactiveFormsModule, AngularSvgIconModule, NgIf, ButtonComponent, NgClass],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  isSkeletonLoader = true;
  passwordTextType!: boolean;
  private authService = inject(AuthService);
  constructor(private readonly _formBuilder: FormBuilder,
     private readonly _router: Router,
     private _alert: ToastService,
    ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isSkeletonLoader = false;
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    let myForm:LoginHttp = this.form.value;
    this.authService.getLogin(myForm).subscribe({
      next: (data) => {
        this.isLoading = false;
        this._alert.success(data.msg);
        this._router.navigate(['/home']);
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

