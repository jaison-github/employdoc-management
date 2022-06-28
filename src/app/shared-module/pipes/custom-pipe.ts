import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: 'printDisplayText' })
export class printDisplayText implements PipeTransform {
   transform(name): any {
      switch (name) {
         case 'CERTIFICATE': {
            return 'Certificate'
         }
         case 'DOCUMENT': {
            return 'Document'
         }
         case 'CANDIDATE_DESIGNATION': {
            return 'Candidate Designation'
         }
         case 'AGENT_DESIGNATION': {
            return 'Agent Designation'
         }
         case 'CANCELLATION_REASON': {
            return 'Cancellation Reason'
         }
         case 'COURSE_CATEGORY': {
            return 'Course Category'
         }
         default: {
            return name
         }
      }
   }
}

@Pipe({ name: 'getFileTypeIcon' })
export class getFileTypeIcon implements PipeTransform {
   transform(name): string {
      let Arr = name?.split('.');
      let fileType = Arr[Arr.length - 1];
      switch (fileType) {
         case 'png': {
            return 'png-icon'
         }
         case 'jpeg': {
            return 'jpg-icon'
         }
         case 'jpg': {
            return 'jpg-icon'
         }
         case 'pdf': {
            return 'icon-pdf'
         }
         default: {
            return 'folder'
         }
      }
   }
}