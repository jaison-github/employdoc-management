import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FilePreviewModel } from 'ngx-awesome-uploader';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TypeFile, uploadDocModel } from '../../models/doc-upload.model';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { IconsService } from '@shared/services/icons.service';
import CustomValidator from '@shared/validator/custom-validator';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {
  @Input() documentList: any;
  @Input() docType: any;
  @Input() showStatus: any;
  @Input() title: string;
  @Input() parentForm: FormGroup;
  @Input() docTypeList: any;
  @Input() userId: any;
  @Input() groupId: any;
  @Input() editMode = false;

  @Output() docUploadSuccess = new EventEmitter<any>();
  @Output() docDeleteSuccess = new EventEmitter<any>();
  @Output() onDocUpload = new EventEmitter<any>();
  @Output() onDocDelete = new EventEmitter<any>();
  vmFile$ = this.fileStore.vm$;

  TypeFile = TypeFile;

  activeDoc: FilePreviewModel = null;
  activeDocType: any = null;
  selectedDocument = null;

  addDocmodalRef?: BsModalRef;
  @ViewChild('addDocument', { static: false }) uploadModel: TemplateRef<void>;
  
  successmodalRef?: BsModalRef;
  @ViewChild('documentAddedTemplate', { static: false }) successModel: TemplateRef<void>;
  subscription: Subscription[] = [];

  isSubmitted = false;
  form: FormGroup;
  today = new Date()
  showDropArea = false;
  yesterday = moment().subtract(1, 'day');
  minExpirtData = new Date();
 uploadedFiles: any = [];
  dochand: any[] = [
    {name: "With Company", code:"IN"},
    {name: "With Employee", code:"OUT"}
  ]
  

  constructor(private formBuilder: FormBuilder,
    public modalService: BsModalService,
    public dialog: MatDialog,
    private _iconsService: IconsService, 
    private fileStore: FileUploadStoreService

  ) {
    this._iconsService.registerIcons(this.icons);
    this.addDocmodalRef = null;
    this.successmodalRef  = null;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      docname: new FormControl(""),
      doctype: new FormControl(null, [Validators.required]),
      issuedate: new FormControl(null, [Validators.required]),
      expirydate: new FormControl(null, [Validators.required]),
      docnumber: new FormControl(null, [Validators.required]),
      attachrefno: new FormControl(null),
      dochand: new FormControl(null, [Validators.required]),
      rowstate: new FormControl(null),
      sno: new FormControl(null),
      data:new FormControl(null),
    },
    {
      validator: [
        CustomValidator.dateRangeValidator('issuedate', 'expirydate'),      
      ]
    }
    );
    this.subscription.push(
      this.vmFile$.subscribe((it) => {
        this.groupId = it.groupId;
        this.uploadedFiles = it.fileList;       
      })
    );

  //  this.f.issueDate.valueChanges.subscribe((val)=>{
     
  //      this.minExpirtData = new Date()
  //  });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

 
  // get doxTypeName(): { [id: string]: string } {
  //   return this.docTypeList.filter(item=>{return item.Id === id});
  // }

  getdoxTypeName(id) {
    let doc = this.docTypeList?.filter(item=>{return item.code === id});
    if(doc && doc.length > 0){return doc[0].name;}    
  }







  public openModal(template: TemplateRef<any>) {
    this.selectedDocument = null;
    this.activeDoc = null;
    this.editMode = false;
    this.activeDocType = null;
    this.groupId = null
    this.fileStore.activeGroupId = null;
    this.fileStore.setState((state): any => {
     state.groupId =null;
     state.fileList = [];
     return {
        ...state
     };
    });
    this.form.reset();
    this.onSubmit();

    this.addDocmodalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop : 'static',
      keyboard : false
    });
  }

  documentAdded(template: TemplateRef<any>) {
    this.successmodalRef = this.modalService.show(template, {
      class: 'modal-lg',
      backdrop : 'static',
      keyboard : false
    });
  }

  // public loadedFiles(files): void {
  //   this.afterDocUpload.emit(files);
  // }

  removeExistingDoc(){}

  onactiveDocTypeChange(event) {
    this.showDropArea = false;
    this.activeDoc = null;
    this.activeDocType = null;
    this.f.doctype.setErrors(null);
    this.form.updateValueAndValidity();
    this.activeDocType = event?.value ? event.value : null;

   let doc = this.documentList.filter(item=>{return item.doctype === event.value});
   if(doc && doc.length > 0){
     //this.setActiveDoc(doc[0]); 
     this.f.doctype.setErrors({ 'incorrect': true });
    }   
  }

  setActiveDoc(document): void{
    this.activeDocType = document.doctype;
    this.groupId = document.attachrefno;
    this.fileStore.setState((state): any => {
     state.groupId = document.attachrefno;
     return {
        ...state
     };
    });
    this.fileStore.getFiles(this.groupId);
    this.form.patchValue(document);
  }

  resetActiveDoc(): void{
    this.activeDoc = null;
    this.groupId = null;
    this.fileStore.setState((state): any => {
     state.groupId = null;
     return {
        ...state
     };
    });
    this.fileStore.getFiles(null);  
    this.f.expirydate.reset();
    this.f.issuedate.reset();
    this.f.docnumber.reset();
    this.f.dochand.reset();
    this.f.data.reset();
    this.f.docname.reset();
  }



  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return true;
    }
    let payload: any = {};
    payload.documentList = [];
    payload.userId = this.userId;
    payload.documentList.push(this.form.getRawValue());
    payload.documentList[0].doctype =  this.form.getRawValue().doctype;
    payload.documentList[0].expirydate = this.form.getRawValue().expirydate;
    payload.documentList[0].issuedate = this.form.getRawValue().issuedate;
    let modelPayload = {payload:payload, docType: this.docType}
    this.docUploadSuccess.emit(modelPayload);
    this.addDocmodalRef.hide();
  }

  removeUserDoc(document): void {
    // let payload = {
    //   userId: this.userId,
    //   userDocumentIdList: [docId],
    //   docType: this.docType
    // }
    _.remove(this.documentList,{attachrefno: document.attachrefno})
    this.docDeleteSuccess.emit(this.documentList);
  }


  confirmDelete(selectedItem, msg?: string ): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      disableClose: true,
      data: msg ? msg: 'Are you sure you want Delete ?' ,
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (action === 'Ok') {
        this.removeUserDoc(selectedItem)
        // if(type == 'auto'){
        // this.activeDocType = null;
        // this.f.documentId.reset();
        // this.f.documentId.setErrors(null);
        // this.form.updateValueAndValidity();
        // }
      }
      else if (action === 'Cancel') {

      }
    });
  }


  afterAddSuccessFn(): void {
    this.documentAdded(this.successModel);
  }

  reset(): void {
    this.activeDoc = null;
  }

  editDocument(document): any{
   this.editMode = true;
   this.selectedDocument = document;
   this.setActiveDoc(document);
   this.addDocmodalRef = this.modalService.show(this.uploadModel, {
    class: 'modal-lg',
    backdrop : 'static',
    keyboard : false
  });
  }



  afterDocUpload(e: any): void {
    this.activeDoc = e;
    if (this.activeDoc && this.activeDoc?.uploadResponse) {
      this.f.data.setValue(this.activeDoc.uploadResponse.DocumentData);
      this.f.docname.setValue(this.activeDoc.fileName);
    }
    else {
      this.f.data.reset();
      this.f.docname.reset();
    }
    this.onDocUpload.emit(this.activeDoc)
  }

  afterDocDelete(e: any): void {
    if(e.fileList.length <=  1){
    this.activeDoc = null;
    this.f.issuedate.reset();
    this.f.expirydate.reset();
    this.f.docnumber.reset();
    this.f.docname.reset();
    this.f.data.reset();
    this.f.dochand.reset();
    this.form.updateValueAndValidity();
    }

    this.fileStore.deleteFiles({groupId: this.groupId, attachmentId: e.file.fileName})
  }


  removeDoxentry(file) {
    this.fileStore.deleteFiles({groupId: this.groupId, attachmentId: file.fileName})
  }



  addMore(docType): void {
    // this.docType = docType;
    if (this.addDocmodalRef) {
      this.addDocmodalRef.hide();
    }
    
    this.successmodalRef.hide();
    this.openModal(this.uploadModel);
  }
  goBack(): void {
    this.successmodalRef.hide();
  }

  closeSuccessModel(): void {
    this.addDocmodalRef?.hide();
    this.successmodalRef?.hide();
  }


  private get icons(): Array<string> {
    return [
      "pdf-icon",
      "icon-pdf",
      "jpg-icon",
      "pdf-file-icon",
      "png-icon",
      "file-remove",
      "folder",
      "view-files",
      "download",
      "icon-delete"
    ];
  }
  public errorHandling = (control: string, error: string) => {
    // return this.form?.controls[control]?.hasError(error);
    return this.form?.controls[control]?.invalid && (this.form?.controls[control]?.dirty || this.form?.controls[control]?.touched || this.isSubmitted) && this.form?.controls[control]?.hasError(error);
  }

}
