import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function base64ImageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && typeof value === 'string') {
      const regex = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/;

      const isValid = regex.test(value);

      if (isValid) {
        return null;
      }
    }

    console.error('Não foi possível carregar imagem base64Image:', value);
    return { invalidBase64Image: true };
  };
}
