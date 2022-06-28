import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { createFileuploadModel } from '@shared/models/doc-upload.model';
import { FileuploadService } from '@shared/services/fileupload.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import * as _ from 'lodash';
import { toNumber } from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map, Observable, startWith, concatMap } from 'rxjs';
import {
  CreateEmpSaveformPayload,
  PrepareFormValue,
} from '../../models/empprofile.model';
import { EmpService } from '../../services/emp.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from '@shared/constants/app-constants';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss'],
})
export class EmpFormComponent implements OnInit, OnDestroy {
  vm$ = this.store.vm$;
  vmFile$ = this.fileStore.vm$;
  masterData: any = null;
  form: FormGroup;
  toppings = new FormControl('');
  isSubmitted = false;
  avatarUrl = 'assets/images/avatar.png';
  nationList: any;
  departmentList: any;
  professionList: any;
  companyList: any;
  docList: any;
  yesterday = moment().subtract(1, 'day');
  vpList: any;
  subscription: Subscription[] = [];
  activeFilterlist: any = null;
  activeGroupId = null;
  fileList: any = [];
  editMode = false;
  uploadedDocumentList = [];
  slectedEmpid = null;
  constructor(
    private ref: ChangeDetectorRef,
    private empService: EmpService,
    private store: MasterDataStoreService,
    private fileStore: FileUploadStoreService,
    private fb: FormBuilder,
    private uploadService: FileuploadService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.empService.getEmpModuleMasterData();

    this.slectedEmpid = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    this.subscription.push(
      this.vm$.subscribe((it) => {
        this.masterData = it;
        this.nationList = this.masterData.nationList;
        this.departmentList = _.cloneDeep(this.masterData.departmentList);
        this.professionList = _.cloneDeep(this.masterData.professionList);
        this.companyList = _.cloneDeep(this.masterData.companyList);
        this.vpList = _.cloneDeep(this.masterData.vpmasterList);
        this.docList = _.cloneDeep(this.masterData.docList);
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

    if (this.slectedEmpid && this.slectedEmpid != '') {
      this.editMode = true;
      this.loadEmpDetails();
    }

    this.initSubscriptions();
    // if(this.editMode && this.formData){
    //   this.populateData(this.formData);
    // }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      empcode: new FormControl('', [Validators.required]),
      empname: new FormControl('', [Validators.required]),
      joindate: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      cmpnycode: new FormControl('', [Validators.required]),
      applnumber: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      jobtitle: new FormControl('', [Validators.required]),
      basic: new FormControl('', { updateOn: 'blur' }),
      hra: new FormControl('', { updateOn: 'blur' }),
      others: new FormControl('', { updateOn: 'blur' }),
      netsalary: new FormControl('', { updateOn: 'blur' }),
      imageid: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit(): any {
    this.saveForm();
    this.isSubmitted = true;
    if (!this.form.valid) {
      return true;
    }
    let payload = this.form.getRawValue();
  }

  saveForm() {
    let payload = CreateEmpSaveformPayload();
    let formValues = PrepareFormValue({ payload: this.form.getRawValue() });
    payload.headerdata = formValues;
    payload.detaildata[0].grddata = this.uploadedDocumentList;
    console.log(payload);
    if (this.editMode) {
      this.empService.validateEmpForm(formValues.empcode).subscribe({
        next: (res) => {
          this.empService.saveEmpForm(payload).subscribe({
            next: (res) => {
              this.route.navigateByUrl('/employeemanagement/employeelist');
            },
            error: (err) => {},
            complete: () => {},
          });
        },
        error: (err) => {},
        complete: () => {},
      });
    } else {
      this.empService.saveEmpForm(payload).subscribe({
        next: (res) => {
          this.route.navigateByUrl('/employeemanagement/employeelist');
        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }

  formData: any = null;
  loadEmpDetails() {
    this.empService.loadEmpDetails(this.slectedEmpid).subscribe({
      next: (res) => {
        this.formData = res.data;
        this.populateData(this.formData);
      },
      error: (err) => {},
    });
  }

  populateData(res: any) {
    this.form.patchValue(res.headerdata);
    if(res.headerdata.imageid){
      this.avatarUrl =   APIURL.avatarurl + res.headerdata.imageid;
    }
    this.f.nationality.setValue(res.headerdata.nationality);
    this.uploadedDocumentList = res.detaildata['eztbL_EMPDET'];
    this.ref.detectChanges();
  }

  afterAvatarUpload(item) {
    let itemModel = createFileuploadModel();
    let payload = new FormData();
    payload.append('file', item.file, item.file.name);
    payload.append('title', item.file.name);
    payload.append('sortOrder', itemModel.sortOrder);
    payload.append('companyCode', itemModel.companyCode);
    payload.append('formId', 'ID_CANDIDATEPROFILE');
    // payload.append("groupId", this.activeGroupId);
    payload.append('username', '');
    this.uploadService.uploadAndGetgroupid(payload).subscribe({
      next: (res) => {
        let activeGroupId = res?.data.groupId;

        this.uploadService.getFileDetails(activeGroupId).subscribe({
          next: (res) => {
            var uploadedFilesDetails = res.data;
            if (uploadedFilesDetails.length > 0) {
            this.f.imageid.setValue(uploadedFilesDetails[0].groupId +'/' +uploadedFilesDetails[0].attachmentId);
            }
          },
          error: (res) => {},
        });
      },
      error: (res) => {},
    });
  }

  calculateNetSalary(): void {
    let bs = this.f.basic.value ? toNumber(this.f.basic.value) : 0;
    let hra = this.f.hra.value ? toNumber(this.f.hra.value) : 0;
    let others = this.f.others.value ? toNumber(this.f.others.value) : 0;
    this.f.netsalary.setValue(bs + hra + others);
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

  initSubscriptions(): void {
    this.subscription.push(
      this.f.nationality.valueChanges.subscribe((value) => {
        this.nationList = this.masterData.nationList.filter((option) =>
          option.name.toLowerCase().includes(value)
        );
      })
    );

    this.subscription.push(
      this.f.department.valueChanges.subscribe((value) => {
        this.departmentList = this.masterData.departmentList.filter((option) =>
          option.name.toLowerCase().includes(value)
        );
      })
    );

    this.subscription.push(
      this.f.jobtitle.valueChanges.subscribe((value) => {
        this.professionList = this.masterData.professionList.filter((option) =>
          option.name.toLowerCase().includes(value)
        );
      })
    );

    this.subscription.push(
      this.f.cmpnycode.valueChanges.subscribe((value) => {
        this.companyList = this.masterData.companyList.filter((option) =>
          option.name.toLowerCase().includes(value)
        );
      })
    );

    this.subscription.push(
      this.f.applnumber.valueChanges.subscribe((value) => {
        this.companyList = this.masterData.vpmasterList.filter((option) =>
          option.name.toLowerCase().includes(value)
        );
      })
    );

    this.subscription.push(
      this.f.basic.valueChanges.subscribe((value) => {
        this.calculateNetSalary();
      })
    );

    this.subscription.push(
      this.f.hra.valueChanges.subscribe((value) => {
        this.calculateNetSalary();
      })
    );

    this.subscription.push(
      this.f.others.valueChanges.subscribe((value) => {
        this.calculateNetSalary();
      })
    );
  }

  deleteFile(event) {}

  displayNationListFn(value?): any {
    let list = this.masterData.nationList;
    if (!value || list.length == 0) return '';
    let index = list.findIndex((item) => item.code === value);
    return list[index].name;
  }

  displayDptmntListFn(value?): any {
    let list = this.masterData.departmentList;
    if (!value || list.length == 0) return '';
    let index = list.findIndex((item) => item.code === value);
    return list[index].name;
  }

  displayProListFn(value?): any {
    let list = this.masterData.professionList;
    if (!value || list.length == 0) return '';
    let index = list.findIndex((item) => item.code === value);
    return list[index].name;
  }

  displayCompListFn(value?): any {
    let list = this.masterData.companyList;
    if (!value || list.length == 0) return '';
    let index = list.findIndex((item) => item.code === value);
    return list[index].name;
  }

  displayVpListFn(value?): any {
    let list = this.masterData.vpmasterList;
    if (!value || list.length == 0) return '';
    let index = list.findIndex((item) => item.code === value);
    return list[index].name;
  }

  getDisplayFn(value, list): any {
    if (list && list.length > 0) {
      let index = list.findIndex((item) => item.code === value);
      return list[index].name;
    }
  }

  filterDropDown(event: any, sourcelist: any[], targetList: string): any {
    if (event && event?.target?.value) {
      const filterValue = event.target.value.toLowerCase();
      this[targetList] = sourcelist.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  setActiveFilter(list): void {
    this.activeFilterlist = list;
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
