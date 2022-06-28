import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIURL } from '@shared/constants/app-constants';
import { createFileuploadModel } from '@shared/models/doc-upload.model';
import { FileuploadService } from '@shared/services/fileupload.service';
import { NotificationService } from '@shared/services/notification.service';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmpService } from 'src/app/main-modules/employee-management/services/emp.service';
import { CreateCmpSaveformPayload, PrepareCmpFormValue } from '../../models/cmpprofile.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, AfterViewInit,  OnDestroy {
  vm$ = this.store.vm$;
  vmFile$ = this.fileStore.vm$;

  masterData: any = null;
  urlID = null;
  editMode = false;v 
  form: FormGroup;
  isSubmitted = false;
  uploadedDocumentList = [];
  avatarUrl = "";
  activeGroupId = null;
  subscription: Subscription[] = [];
  fileList: any = [];
  docList: any = [];
  licenseList: any = [];

  constructor(
    private ref: ChangeDetectorRef,
    private cmpService: CompanyService,
    private store: MasterDataStoreService,
    private fileStore: FileUploadStoreService,
    private fb: FormBuilder,
    private uploadService: FileuploadService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private notify: NotificationService,
  ) {
    this.cmpService.getCompMasterData();
    this.urlID = this.activatedRoute.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {

    this.subscription.push(
      this.vm$.subscribe((it) => {
        this.masterData = it;
        this.docList = this.masterData.misc;
        // this.docList = _.cloneDeep(this.masterData.docList);
        this.ref.detectChanges();
      })
    );


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
      this.loadDetails();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }


  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required]),
      cmpnycode: new FormControl('', [Validators.required]) ,
      cmpnyname: new FormControl('', [Validators.required]) ,
      cmpnyaddress: new FormControl('', [Validators.required]) ,
      licencenumber: new FormControl('', [Validators.required]),        
      noofstaff: new FormControl('', [Validators.required])    
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): any {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return true;
    }
    this.saveForm();
  }

  saveForm() {
    let payload = CreateCmpSaveformPayload();
    let formValues = PrepareCmpFormValue({ payload: this.form.getRawValue() });
    payload.headerdata = formValues;
    payload.detaildata[0].grddata = this.uploadedDocumentList;
    if (this.editMode) {

      this.cmpService.validateForm(formValues.cmpnycode).subscribe({
        next: (res) => {
          this.cmpService.saveForm(payload).subscribe({
            next: (res) => {
              this.notify.showSuccess("Profile Updated Successfully", 'Employee Profile')
                           
              this.route.navigateByUrl('/companyprofile/companylist');
            },
            error: (err) => {},
            complete: () => {},
          });
        },
        error: (err) => {},
        complete: () => {},
      });


    }
    else{
      this.cmpService.saveForm(payload).subscribe({
        next: (res) => {
          this.notify.showSuccess("Profile Saved Successfully", 'Employee Profile')

          this.route.navigateByUrl('/companyprofile/companylist');
        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }


  formData: any = null;
  loadDetails(){
    this.cmpService.loadData(this.urlID).subscribe({
      next: (res) => {
        this.formData = res.data;
        this.populateData(this.formData);
      },
      error: (err) => {},
    });
  }

  populateData(res: any) {
    this.form.patchValue(res.headerdata);  
    this.uploadedDocumentList = res.detaildata['eztbL_COMPANYDET'];
    this.ref.detectChanges();
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

  deleteFile(event) {}

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
