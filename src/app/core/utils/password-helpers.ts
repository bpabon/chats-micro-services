import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  const hasMinLength = value.length >= 8;
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSymbol = /[\W_]/.test(value); // símbolos o guiones bajos

  const valid = hasMinLength && hasUppercase && hasNumber && hasSymbol;

  return valid ? null : {
    passwordComplexity: {
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSymbol
    }
  };
}
