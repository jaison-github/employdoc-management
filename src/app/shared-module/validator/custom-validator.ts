import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export default class CustomValidator {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
          const control = controls.get(controlName);
          const checkControl = controls.get(checkControlName);
    
          if (checkControl?.errors && !checkControl.errors['matching']) {
            return null;
          }
    
          if (control?.value !== checkControl?.value) {
            controls.get(checkControlName)?.setErrors({ matching: true });
            return { matching: true };
          } else {
            return null;
          }
        };
      }

      static whitespaceValidator(form: FormControl): ValidationErrors {
        return form.value?.startsWith(" ") ? {whitespace: true} : null;
      }

      static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const fromDate = formGroup.get(fromDateField).value;
            const toDate = formGroup.get(toDateField).value;
           // Ausing the fromDate and toDate are numbers. In not convert them first after null check
            if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
                return {[errorName]: true};
            }
            return null;
        };
    }


    static dateRangeValidator(fromDateField: string, toDateField: string, errorName: string = 'rangeMissMatch'): ValidatorFn {
      return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
          const fromDate = formGroup.get(fromDateField).value;
          const toDate = formGroup.get(toDateField).value;
          // Ausing the fromDate and toDate are numbers. In not convert them first after null check
          if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
              formGroup['controls'][toDateField].setErrors({ rangeMissMatch: true });
              // return {[errorName]: true};
          }
          return null;
      };
  }


  static AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    var age = moment().diff(control.value, 'years', true);
    if (age < 18) {
      return { 'age': true };
    }
    return null;
  }

}


