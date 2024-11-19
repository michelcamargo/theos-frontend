import { ValidationErrors, ValidatorFn } from '@angular/forms';

class ValidatorsHelper {
  static isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  static isValidUrl(url: string) {
    const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[^\s]*)?$/i;
    return urlRegex.test(url);
  }

  static formBase64Image(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;

      if (value && typeof value === 'string') {
        const regex = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/;

        const isValid = regex.test(value);

        if (isValid) {
          return null;
        }
      }
      return { invalidBase64Image: true }
    };
  }

  static urlFormInput(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return ValidatorsHelper.isValidUrl(value) ? null : { invalidUrl: true }
    };
  }

  static emailFormInput(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      return ValidatorsHelper.isValidEmail(value) ? null : { invalidEmail: true }
    };
  }
}

export default ValidatorsHelper;
