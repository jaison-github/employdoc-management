import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterDataLookUpTypes } from '@shared/models/master.models';
import { MasterdataService } from '@shared/services/masterdata.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { lt, multiply } from 'lodash';
import { Subscription } from 'rxjs';
import { EmpService } from '../../services/emp.service';
import { EmpStoreService } from '../../store/emp-management.state';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss'],
})
export class EmpProfileComponent implements OnInit {
  vm$ = this.masterStore.vm$;
  vmEmp$ = this.store.vm$;

  listingRequest = null;
  masterData: any = null;
  form: FormGroup;

  subscription: Subscription[] = [];
  employeeList: any[] = [];

  constructor(
    private ref: ChangeDetectorRef,
    private empService: EmpService,
    private store: EmpStoreService,
    private masterStore: MasterDataStoreService,

    private fb: FormBuilder,
    private route: Router
  ) {
    
  }

  ngOnInit(): void {
    this.store.getEmpList(MasterDataLookUpTypes.browsedata);
  }

  ngAfterViewInit() {
    this.subscription.push(
      this.vm$.subscribe((it) => {
        this.masterData = it;
      })
    );
    this.subscription.push(
      this.vmEmp$.subscribe((it) => {
        this.employeeList = it.empList;
      })
    );
  }

  goToEmpDetails(empId) {
    empId == null
      ? this.route.navigate(['/employeemanagement/employeeprofile', ''])
      : this.route.navigate(['/employeemanagement/employeeprofile', empId]);
  }

  detailView(candidate): void{

  }
}
