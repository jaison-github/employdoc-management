import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({ name: 'CustomDate' })
export class CustomDate implements PipeTransform {
  transform(date: Date | string, emptyData: string = 'No data', format: string = 'dd/MMM/yyyy'): string {
    if (date) {
      date = new Date(date);
      return new DatePipe('en-US').transform(date, format);
    }
    else {
      return emptyData;
    }

  }
}

@Pipe({ name: 'CustomDateTime' })
export class CustomDateTime implements PipeTransform {
  transform(date: Date | string, emptyData: string = 'No data', format: string = 'dd/MMM/yyyy'): string {
    if (date) {
      date = new Date(date);
      let datetime = new DatePipe('en-US').transform(date, format);

      let hour: any = date.getHours();
      let min: any = date.getMinutes();
      min = String(min).padStart(2, '0')
      let ampm = "AM";
      let iHourCheck = parseInt(hour);
      if (iHourCheck > 12) {
        ampm = "PM";
        hour = iHourCheck - 12;
      }
      else if (iHourCheck === 0) {
        hour = "12";
      }

      hour = String(hour).padStart(2, '0')
      return datetime + ' ' + hour + ':' + min + ' ' + ampm;
    }
    else {
      return emptyData;
    }

  }
}


@Pipe({ name: 'DayOrDays' })
export class DayOrDays implements PipeTransform {
  transform(day): string {
    if (day > 1) { return day + ' Days' }
    else return day + ' Day';
  }
}

@Pipe({ name: 'SeatOrSeats' })
export class SeatOrSeats implements PipeTransform {
  transform(seat): string {
    if (seat > 1) { return seat + ' seats' }
    else return seat + ' seat';
  }
}

@Pipe({ name: 'WidgetTag' })
export class WidgetTag implements PipeTransform {
  transform(data): string {
    if (data == "CANDIDATE") {
      return "Candidate";
    }
    else if (data == "AGENT") {
      return "Agent";
    }
    else {
      return data;
    }

  }
}

@Pipe({ name: 'CleanText' })
export class CleanText implements PipeTransform {
  transform(data): string {
    return data.replace('_', ' ');
  }
}


// @Pipe({ name: 'MultipleDate' })
// export class MultipleDate implements PipeTransform {
//   transform(date:any, emptyData: string = 'No data',  format: string = 'dd/MMM/yyyy'): string {
//     if (date) {
//      if(date.split(',').length > 1){      
//       return 'Multiple Dates';
//      }
//      else{
//       date = new Date(date);
//       return new DatePipe('en-US').transform(date, format);
//      }
//     }
//     else {
//       return emptyData;
//     }

//   }
// }


@Pipe({  
  name: 'MultipleDate'  
})  
  
export class MultipleDate implements PipeTransform {  
  
  constructor(private _sanitizer: DomSanitizer) { }  
  
  transform(date: string, emptyData: string = 'No data',  format: string = 'dd/MMM/yyyy'): SafeHtml {  
  
      let html = '<span class="css-tooltip tip-ml tip-wrap tip-fontNormal"  data-tip="'+ date +'">Multiple Dates</span>';  
     
      if (date) {
        if(date.split(',').length > 1){      
         return  this._sanitizer.bypassSecurityTrustHtml(html); ;
        }
        else{
         let _date = new Date(date);
         return new DatePipe('en-US').transform(_date, format);
        }
       }
       else {
         return emptyData;
       }
  }  
}  