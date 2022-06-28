
const baseUrl = 'http://20.98.154.110/api/';
export const APIURL={
    baseUrl: baseUrl,
    avatarurl: 'http://20.98.154.110/uploadedfiles/',
    loginapiUrl:baseUrl + 'logincheck',
    masterdataApiUrl:baseUrl + 'masterdata',
    validateEmpFormUrl:baseUrl + 'validateform',
    saveEmpFormUrl:baseUrl + 'saveform',
    deleteEmpFormUrl:baseUrl + 'deleteform',
    getFileDetailsUrl:baseUrl + 'getFileDetails',
    loadEmpFormUrl:baseUrl + 'loaddata',
    uploadFileUrl: baseUrl + 'UploadFile',
    deleteFileUrl: baseUrl + 'removefile',
    empListUrl: baseUrl + 'browsedata',
    getdocumentdetails: baseUrl + 'getdocumentdetails',
    saveDocFormUrl:baseUrl + 'saveform',
    docListUrl: baseUrl + 'browsedata',
    alertUrl: baseUrl + 'getalerts',


    

    
    
}

export const APP_DATE_FORMATS = {
    parse: {
      dateInput: 'YYYY-MM-DD',
    },
    display: {
      dateInput: 'DD/MMM/YYYY',
      monthYearLabel: 'DD/MMM/YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'DD/MMM/YYYY',
    },
  };

  
export const APP_DATE_FORMATS_V2 = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM/YYYY',
  },
};

  export const APP_Forgot_Password_Url = {
   url:'http://10.0.131.21/ADMA2/Web/#/forgotpassword/updatepassword/'
  };

  export const APP_Email_Pattern = {
    pattern:'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
   };

   export const APP_Password_Pattern = {
    pattern:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).\\S{7,14}$'
   };

   export const APP_Mobno_Pattern = {
    pattern:'^((\\+971-?)|0)?[0-9]{12}$'
   };

   export const APP_Gender_List = {
    list:[{ id: 'MALE', name: 'Male' }, { id: 'FEMALE', name: 'Female' }, { id: 'OTHER', name: 'Other' }]
   };