import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileuploadService } from '@shared/services/fileupload.service';
import { NotificationService } from '@shared/services/notification.service';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import { Subscription } from 'rxjs';

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
casePriorityList = [{code:'HI', name: 'High'}, {code:'MD', name: 'Medium'},  {code:'LO', name: 'Low'}]
courtTypeList = [{code:'MC', name: 'Muncipal Court'}, {code:'HC', name: 'High Court'},  {code:'RC', name: 'Regional Court'}, {code:'SC', name: 'Supreme Court'}]
judgeTypeList = [{code:'MJ', name: 'Muncipal Court Judge'}, {code:'HJ', name: 'High Court Judge'},  {code:'RJ', name: 'Regional Court judge'}, {code:'SJ', name: 'Supreme Court Judge'}]


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
  }


  
  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required]),
      clientname: new FormControl('', [Validators.required]) ,
      clienttype: new FormControl('', [Validators.required]) ,
      respondentname: new FormControl('', [Validators.required]) ,
      respondentadv: new FormControl('', [Validators.required]) ,

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
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void{

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
