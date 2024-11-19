import { ValidationErrors, ValidatorFn } from '@angular/forms';

class ValidatorsHelper {
  static base64Image(): ValidatorFn {
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

  static url(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[^\s]*)?$/i;
      const valid = urlRegex.test(value);

      return valid ? null : { invalidUrl: true };
    };
  }

  static email(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(value);

      return valid ? null : { invalidEmail: true }
    };
  }
}

export default ValidatorsHelper;
