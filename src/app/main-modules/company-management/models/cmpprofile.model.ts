
export interface cmphedarData {
          id:number,
          cmpnycode: string,
          cmpnyname: string,
          cmpnyaddress: string,
          licencenumber: string,        
          noofstaff: number
        }

export const PrepareCmpFormValue = ({
   payload = null
} = {}): cmphedarData => ({
    id:0,
    cmpnycode: payload.cmpnycode,
    cmpnyname: payload.cmpnyname,
    cmpnyaddress:  payload.cmpnyaddress,
    licencenumber:  payload.licencenumber,
    noofstaff:  payload.noofstaff,  
});


export const CreateCmpSaveformPayload = () => ({   
        newmode: true,
        primarykey: 0,
        headertable: 'EZTBL_COMPNYHD',
        procname: '',
        headerdata:{},
        detaildata: [
            {
              tablename: "EZTBL_COMPANYDET",
              columnnames: "doctype,docnumber,issuedate,expirydate,attachrefno",
              grddata:[]
            }
        ]   
});