import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HelperServies {

  constructor(private toastr: ToastrService , private notify: NotificationService) { }

  showErrorMsg(error) {
    let errorObject = error.error;
    if (errorObject.errorlst !== null && errorObject.errorlst.length > 0 || (errorObject.Errorlst !== null && errorObject.Errorlst.length > 0)  ) {
      var errorList = [];
      errorObject.errorlst.forEach(element => {
        errorList.push(element.error.split("\n "));
      });
      return this.notify.showError(JSON.stringify(errorList.toString()), "Error");
    }
    else if (errorObject.msg) {
      return this.notify.showError(errorObject.msg, "Error");
    }
    // else {
    //   return this.notify.showError(constants.endUserTechnicalErrorMsg, "Error");
    // }
  }

  toCamel(o, _case = "upper") {
    var newO, origKey, newKey, value
    if (o instanceof Array) {
      return o.map(function (value) {
        if (typeof value === "object") {
          value = this.toCamel(value, _case)
        }
        return value
      })
    } else {
      newO = {}
      for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
          if (_case == "upper") {
            newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString();
          }
          else {
            newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
          }
          value = o[origKey]
          if (value instanceof Array || (value !== null && value.constructor === Object)) {
            value = this.toCamel(value, _case)
          } _case
          newO[newKey] = value
        }
      }
    }
    return newO
  }
  


  generateUUID() { // Public Domain/MIT
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

getOnlyNewDate(DATE: Date): Date{   
  return new Date(DATE.getFullYear()+'/'+(DATE.getMonth()+1)+'/'+DATE.getDate());
}

}
