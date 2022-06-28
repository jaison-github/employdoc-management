import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataLookUpTypes } from '@shared/models/master.models';
import { IconsService } from '@shared/services/icons.service';
import { NotificationService } from '@shared/services/notification.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
  CreateDocSaveformPayload,
  PrepareFormValue,
} from '../../models/doc.model';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-new-in-out',
  templateUrl: './doc-new-in-out.component.html',
  styleUrls: ['./doc-new-in-out.component.scss'],
})
export class DocNewInOutComponent implements OnInit, AfterViewInit, OnDestroy {
  dochand: any[] = [
    { name: 'With Company', code: 'IN' },
    { name: 'With Employee', code: 'OUT' },
  ];

  docOut = true;
  form: FormGroup;
  selectedDate: any = {};
  empDropDownlist = [];
  empDropDownFilterlist = [];

  gridData = [];
  displayedColumns: string[] = [
    'select',
    'doctype',
    'docnumber',
    'expirydate',
    'issuedate',
  ];
  dataSource = new MatTableDataSource<any>(this.gridData);
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;
  subscription: Subscription[] = [];

  urlParam = null;
  vmMisc$ = this.mStore.vmMisc$;
  editMode = false;
  constructor(
    private _iconsService: IconsService,
    private fb: FormBuilder,
    private mStore: MasterDataStoreService,
    private ref: ChangeDetectorRef,
    private docService: DocService,
    private route: Router,
    private notify: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this._iconsService.registerIcons(this.icons);
    this.mStore.getMasterDatalist(MasterDataLookUpTypes.empdropdownlist);
    this.urlParam = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      empcode: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      remarks: new FormControl(null),
      dochand: new FormControl(false),
    });


    this.f.empcode.valueChanges.subscribe((value) => {
      this.empDropDownFilterlist = this.empDropDownlist.filter((option) =>
        option.name.toLowerCase().includes(value.toString())
      );
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.vmMisc$.subscribe((it) => {
      this.empDropDownlist = it.misc;
      this.empDropDownFilterlist = this.empDropDownlist;
      this.ref.detectChanges();
    });

    if (this.urlParam && this.urlParam != '' && this.urlParam != 'new') {
      this.editMode = true;
      this.loadDetails(this.urlParam);
    }

    this.initSubsription();
    this.f.date.setValue(new Date());

    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub =>{ sub.unsubscribe();})
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  initSubsription(): void {
    this.subscription.push(
      this.f.empcode.valueChanges.subscribe((value) => {
        if (value) {
          this.getFileDetails(value);
        }
      })
    );

    this.subscription.push(
      this.f.dochand.valueChanges.subscribe((value) => {
        if (this.f.empcode.value) {
           this.getFileDetails(this.f.empcode.value);
        }
      })
    );

    this.subscription.push(
      this.f.date.valueChanges.subscribe((value) => {
        this.extractDate(value);
      })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      let payload = CreateDocSaveformPayload();
      let formValues = PrepareFormValue({ payload: this.form.getRawValue() });
      payload.headerdata = formValues;
      payload.detaildata[0].grddata = this.selection.selected;

      this.docService.saveDocForm(payload).subscribe({
        next: (res) => {
          this.notify.showSuccess(
            'Document Action saved successfully.',
            'Save'
          );
          this.route.navigateByUrl('/documentmanagement/docinoutlist');
        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }

  extractDate(date) {
    this.selectedDate.day = moment(date).format('DD');
    this.selectedDate.month = moment(date).format('MMM');
    this.selectedDate.year = moment(date).format('YYYY');
  }

  setDocHand(status) {
    status == 'IN'
      ? this.f.dochand.setValue(true)
      : this.f.dochand.setValue(false);
  }

  getFileDetails(empcode): void {
    let payload = {
      empcode: empcode,
      dochand: this.f.dochand.value ? 'IN' : 'OUT',
    };
    this.docService.getFileDetails(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.gridData = res;
        this.dataSource.data = this.gridData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {},
    });
  }

  loadDetails(empcode): void {
    this.docService.loadDocLoationDetails(empcode).subscribe({
      next: (res) => {
        this.populateData(res.data);
      },
      error: (err) => {},
    });
  }

  populateData(dataSource): void {
    console.log(dataSource);
    this.gridData = dataSource.detaildata['eztbL_DOCDET'];
    this.form.patchValue(dataSource.headerdata);
    let docaction = dataSource.headerdata.docaction == 'IN' ? true : false;
    this.f.dochand.setValue(docaction);
    this.f.date.setValue(dataSource.headerdata.docdate);
this.f.empcode.setValue(dataSource.headerdata.empcode);
    this.dataSource.data = this.gridData;

    this.ref.detectChanges();
  }


  displayFn(value?): any {
    let list = this.empDropDownlist;
    if (!value || list.length == 0 ) return '';
    let index = list.findIndex((item) => item.code === value.toString());
    return  list[index].name;
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  private get icons(): Array<string> {
    return [
      'pdf-icon',
      'icon-pdf',
      'jpg-icon',
      'pdf-file-icon',
      'png-icon',
      'file-remove',
      'folder',
      'view-files',
      'download',
      'icon-delete',
      'company-employee',
      'file-in-hand',
      'employee-iocn',
      'file-folder',
    ];
  }

  public errorHandling = (control: string, error: string, formGroup = null) => {
    if (formGroup) {
      let _form = this.form?.controls[formGroup]['controls'];
      return (
        _form[control]?.invalid &&
        (_form[control]?.dirty || _form[control]?.touched) &&
        _form[control]?.hasError(error)
      );
    } else {
      return (
        this.form?.controls[control]?.invalid &&
        (this.form?.controls[control]?.dirty ||
          this.form?.controls[control]?.touched) &&
        this.form?.controls[control]?.hasError(error)
      );
    }
  };
}
