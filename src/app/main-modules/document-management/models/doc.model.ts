

export interface DocHedarData {
          id:number,
          empcode: string,
          docaction: string,
          docdate: any ,
          remarks: string          
}

export const PrepareFormValue = ({
   payload = null
} = {}): DocHedarData => ({
    id:0,
    empcode: payload.empcode,
    docaction: payload.dochand? 'IN': 'OUT',
    docdate:  payload.docdate,
    remarks:  payload.remarks,  
});


export const CreateDocSaveformPayload = () => ({   
        newmode: true,
        primarykey: 0,
        headertable: 'EZTBL_DOCHD',
        procname: 'sp_docaftersave',
        headerdata:{},
        detaildata: [
            {
              tablename: "EZTBL_DOCDET",
              columnnames: "doctype,docnumber,issuedate,expirydate,docsno",
              grddata:[]
            }
        ]   
});