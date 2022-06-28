
export class DocumentUploadModel {	
	DocumentCode: string = '';
	IsRequired: boolean = true;
	DocumentName: string = '';
	DocumentFileName: string = '';
	DocumentFileSize: string = '';
	DocumentFileType: string = '';
	DocumentData: string = '';
  }

  
  export class uploadDocModel {	
    userId: string = "";
    documentList: DocumentListModel[] = [];
  }
  
  
export class DocumentListModel {	
  documentId: string = "";
  issueDate: string = "";
  issueAuthority: string = "";
  userDocumentName: string = "";
  uploadDocumentName:  string = "";
  expiryDate: string = "";
  data: string = "";
}

export const createFileuploadModel = () => ({   
  file: null,
  title: null,
  sortOrder: null,
  companyCode:'', 
  formId: 'ID_CANDIDATEPROFILE',
  groupId: null,
  username:'' 
});



export enum TypeFile {
    PNG = "image/png",
    // JPG = 'CHARGES',
    PDF = "application/pdf",
    EXCEL = "EXCEL",
  }
