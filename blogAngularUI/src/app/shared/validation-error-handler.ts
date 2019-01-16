import {FormGroup} from "@angular/forms";

export class ValidationErrorHandler {


  static handleFormValidationErrors(form:FormGroup,validationResult:any):void{
    for (const property in validationResult) {
      if (validationResult.hasOwnProperty(property)) {
        if (form.controls[property]) {
          const validationErrorsForFormField={};

          for (const validationError of validationResult[property]) {
            validationErrorsForFormField[validationError.validatorKey]=true;
          }
          form.controls[property].setErrors(validationErrorsForFormField);
        }else{

          const validationErrorsForForm={};

          for (const validationError of validationResult[property]) {
            validationErrorsForForm[validationError.validatorKey]=true;

          }

          form.setErrors(validationErrorsForForm);

        }
      }
    }
  }
}
