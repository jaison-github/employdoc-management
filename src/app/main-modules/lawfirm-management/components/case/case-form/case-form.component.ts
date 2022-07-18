import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { createFileuploadModel } from '@shared/models/doc-upload.model';
import { FileuploadService } from '@shared/services/fileupload.service';
import { NotificationService } from '@shared/services/notification.service';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { CreateLawfirmSavePayload } from '../../../models/lawfirm.model';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit {
  vmFile$ = this.fileStore.vm$;

  urlID = null;
  form: FormGroup;
  editMode = false;
  subscription: Subscription[] = [];
  fileList: any = [];
  activeGroupId = null;
  isSubmitted = false;
  uploadedDocumentList = [];

  clientTypeList = [{code:'PT',name: 'Petitioner' }, {code:"RS", name:'Respondent'}]
  caseTypeList = [{code:'CV',name: 'Civil' }, {code:'CR',name: 'Criminal' }, {code:'FA',name: 'Family' }]
  caseSubTypeList = [{type:'CV', code:'CD', name: 'Contract Disputes' }, 
  {type:'CV', code:'CD', name: 'Contract Disputes' },
  {type:'CV', code:'PD', name: 'Property Disputes' },
  {type:'CR', code:'MR', name: 'Murder' },
  {type:'CR', code:'AS', name: 'Assult' },
  {type:'CR', code:'SA', name: 'Sexual Assult' },
  {type:'CR', code:"TF", name: 'Theft'},
  {type:'FA', code:"MD", name: 'Marriage Dissolution'},
  {type:'FA', code:"PC", name: 'Paternity and Child Custody'},
  {type:'FA', code:"JV", name: 'Juvenile Matters.'}
]
caseStageList = [{code:'OP', name: 'OPEN'}, {code:'CL', name: 'CLOSED'},  {code:'PE', name: 'PENDING'}]
casePriorityList = [{code:'HI', name: 'HIGH'}, {code:'MD', name: 'MEDIUM'},  {code:'LO', name: 'LOW'}]
courtTypeList = [{code:'MC', name: 'Muncipal Court'}, {code:'HC', name: 'High Court'},  {code:'RC', name: 'Regional Court'}, {code:'SC', name: 'Supreme Court'}]
judgeTypeList = [{code:'MJ', name: 'Muncipal Court Judge'}, {code:'HJ', name: 'High Court Judge'},  {code:'RJ', name: 'Regional Court judge'}, {code:'SJ', name: 'Supreme Court Judge'}]
activeCaseSubtype = [];

docList = [{code:'LG', name: 'Leagal Documents'}, {code:'OT', name: 'Other Documents'}, {code:'CT', name: 'Court Documents'}, {code:'FD', name: 'FIR Documents'}];


  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private uploadService: FileuploadService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private notify: NotificationService,
    private fileStore: FileUploadStoreService,


  ) {
    this.urlID = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    this.subscription.push(
      this.vmFile$.subscribe((it) => {
        this.activeGroupId = it.groupId;
        this.fileList = it.fileList;
        console.log('last Uploaded File list', this.fileList);
        this.ref.detectChanges();
      })
    );

    if (this.urlID && this.urlID != '' &&  this.urlID != 'new') {
      this.editMode = true;
    }
    this.ref.detectChanges();
  }


  
  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required]),
      clientname: new FormControl('', [Validators.required]) ,
      clienttype: new FormControl('', [Validators.required]) ,
      clientmob: new FormControl('', [Validators.required]) ,
      clientemail: new FormControl('', [Validators.required]) ,
      respondentname: new FormControl('', [Validators.required]) ,
      respondentmob: new FormControl('', [Validators.required]) ,
      respondentadv: new FormControl('', [Validators.required]) ,
      respondentadvmob: new FormControl('', [Validators.required]) ,


      caseno: new FormControl('', [Validators.required]),        
      casetype: new FormControl('', [Validators.required]),
      casesubtype: new FormControl('', [Validators.required]),
      casestage: new FormControl('', [Validators.required]),
      casepriority: new FormControl('', [Validators.required]),    
      act: new FormControl('', [Validators.required]),
      filingno: new FormControl('', [Validators.required]),
      filingdate: new FormControl('', [Validators.required]),
      regnumber: new FormControl('', [Validators.required]),
      regdate: new FormControl('', [Validators.required]),
      firsthearingdate: new FormControl('', [Validators.required]),
      cnrnumber: new FormControl('', [Validators.required]),
      decription: new FormControl('', [Validators.required]),

      policestation: new FormControl('', [Validators.required]),
      firno: new FormControl('', [Validators.required]),
      firdate: new FormControl('', [Validators.required]),

      courtno: new FormControl('', [Validators.required]),
      courttype: new FormControl('', [Validators.required]),
      court: new FormControl('', [Validators.required]),
      judgetype: new FormControl('', [Validators.required]),
      judgename: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),

      adovcate: new FormControl('', [Validators.required]),
      adovcateLevel: new FormControl('', [Validators.required]),

   
    });



    this.f.casetype.valueChanges.subscribe(val=>{
        this.activeCaseSubtype = _.filter(this.caseSubTypeList, {type: val});
        this.ref.detectChanges();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): any{
    this.isSubmitted = true;
    if (!this.form.valid) {
      return true;
    }
    this.saveForm();
  }


  saveForm() {
    let payload = CreateLawfirmSavePayload();
    let formValues =  this.form.getRawValue();
    payload.headerdata = formValues;
    payload.detaildata[0].grddata = this.uploadedDocumentList;
    console.log(payload);
    if (this.editMode) {
      // this.empService.validateEmpForm(formValues.empcode).subscribe({
      //   next: (res) => {
      //     this.empService.saveEmpForm(payload).subscribe({
      //       next: (res) => {
      //         this.notify.showSuccess("Profile Updated Successfully", 'Employee Profile')
              
              
      //         this.route.navigateByUrl('/employeemanagement/employeelist');
      //       },
      //       error: (err) => {},
      //       complete: () => {},
      //     });
      //   },
      //   error: (err) => {},
      //   complete: () => {},
      // });
    } else {
      // this.empService.saveEmpForm(payload).subscribe({
      //   next: (res) => {
      //     this.notify.showSuccess("Profile Saved Successfully", 'Employee Profile')

      //     this.route.navigateByUrl('/employeemanagement/employeelist');
      //   },
      //   error: (err) => {},
      //   complete: () => {},
      // });
    }
  }



  getGroupidOnDocUpload(item) {
    let itemModel = createFileuploadModel();
    let payload = new FormData();
    payload.append('file', item.file, item.file.name);
    payload.append('title', item.file.name);
    payload.append('sortOrder', itemModel.sortOrder);
    payload.append('companyCode', itemModel.companyCode);
    payload.append('formId', 'ID_CANDIDATEPROFILE');
    // payload.append("groupId", this.activeGroupId);
    payload.append('username', '');
    // this.uploadService.uploadAndGetgroupid(payload).subscribe({
    //   next: (res)=>{ this.activeGroupId = res?.data.groupId; },
    //   error: (res)=>{}
    // })

    this.fileStore.upoloadfile(payload);
  }

  afterDocUploadSuccess(event) {
    let newDoc = event.payload.documentList[0];
    newDoc.attachrefno = this.activeGroupId;
    let index = this.uploadedDocumentList.findIndex(
      (item) => item.doctype === newDoc.doctype
    );
    if (index >= 0) {
      this.uploadedDocumentList[index] = newDoc;
    } else {
       newDoc.sno = this.uploadedDocumentList.length +  1;
      //  newDoc.rowstate = this.uploadedDocumentList.length +  1;

      this.uploadedDocumentList.push(newDoc);
    }
  }

  afterDocDelete(event) {
    this.uploadedDocumentList = event;
  }


  deleteFile(e): void{
    
  }


  public errorHandling = (control: string, error: string, formGroup = null) => {
    if (formGroup) {
      let _form = this.form?.controls[formGroup]['controls'];
      return (
        _form[control]?.invalid &&
        (_form[control]?.dirty ||
          _form[control]?.touched ||
          this.isSubmitted) &&
        _form[control]?.hasError(error)
      );
    } else {
      return (
        this.form?.controls[control]?.invalid &&
        (this.form?.controls[control]?.dirty ||
          this.form?.controls[control]?.touched ||
          this.isSubmitted) &&
        this.form?.controls[control]?.hasError(error)
      );
    }
  };
}
