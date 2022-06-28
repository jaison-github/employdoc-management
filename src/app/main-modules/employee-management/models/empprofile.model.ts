

export interface emphedarData {
          id:number,
          empcode: string,
          empname: string,
          joindate: string,
          dob: string,
          department: string,
          jobtitle: string,
          imageid:string ,
          cmpnycode: number,
          applnumber: number,
          nationality: string,
          gender: string,
          basic: number,
          hra: number,
          others: number,
          netsalary: number,
          empstatue:string
}

export const PrepareFormValue = ({
   payload = null
} = {}): emphedarData => ({
    id:0,
    empcode: payload.empcode,
    empname: payload.empname,
    joindate:  payload.joindate,
    dob:  payload.dob,
    department:  payload.department,
    jobtitle:  payload.jobtitle,
    imageid: payload.imageid ,
    cmpnycode:  payload.cmpnycode,
    applnumber:  payload.applnumber,
    nationality:  payload.nationality,
    gender:  payload.gender,
    basic:  payload.basic,
    hra:  payload.hra,
    others:  payload.others,
    netsalary:  payload.netsalary,
    empstatue: payload.empstatue,
});






export const CreateEmpSaveformPayload = () => ({   
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