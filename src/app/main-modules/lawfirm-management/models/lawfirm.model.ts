
// export interface lawfirmhedarData {
//           id:number,
//           client: string,
//           cmpnyname: string,
//           cmpnyaddress: string,
//           licencenumber: string,        
//           noofstaff: number
//         }

// export const PrepareLawfirmFormValue = ({
//    payload = null
// } = {}): lawfirmhedarData => ({
//     id:0,
//     cmpnycode: payload.cmpnycode,
//     cmpnyname: payload.cmpnyname,
//     cmpnyaddress:  payload.cmpnyaddress,
//     licencenumber:  payload.licencenumber,
//     noofstaff:  payload.noofstaff,  
// });


// export const CreatezlawFirmSaveformPayload = () => ({   
//         newmode: true,
//         primarykey: 0,
//         headertable: 'EZTBL_COMPNYHD',
//         procname: '',
//         headerdata:{},
//         detaildata: [
//             {
//               tablename: "EZTBL_COMPANYDET",
//               columnnames: "doctype,docnumber,issuedate,expirydate,attachrefno",
//               grddata:[]
//             }
//         ]   
// });



export const CreateLawfirmSavePayload = () => ({   
    newmode: true,
    primarykey: 0,
    headertable: 'EZTBL_EMPHD',
    procname: 'sp_empaftersave',
    headerdata:{},
    detaildata: [
        {
          tablename: "EZTBL_EMPDET",
          columnnames: "doctype,docnumber,issuedate,expirydate,dochand,attachrefno",
          grddata:[]
        }
    ]   
});