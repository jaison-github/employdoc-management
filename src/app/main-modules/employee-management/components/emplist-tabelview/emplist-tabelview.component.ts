import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from '@shared/constants/app-constants';
import {
  Order,
  Pagination,
  FilterOperator,
} from '@shared/models/master.models';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EmpStoreService } from '../../store/emp-management.state';

@Component({
  selector: 'app-emplist-tabelview',
  templateUrl: './emplist-tabelview.component.html',
  styleUrls: ['./emplist-tabelview.component.scss'],
})
export class EmplistTabelviewComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [
    'empname',
    'empcode',
    'joindate',
    'dob',
    'cmpnycode',
    'applnumber',
    'status',
    'department',
    'profession',
    'gender',
    'netsalary',
  ];

  @Output() selectactiveCourse = new EventEmitter<any>();
  @Input() activeRow = null;
  vmEmp$ = this.store.vm$;

  employeeList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.employeeList);
  selection = new SelectionModel<any>(false, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;
  sortOrder: Order = new Order();
  pagination: Pagination = new Pagination();
  filter: FilterOperator = new FilterOperator();

  pageIndex: number = 1;
  pageSize: number = 12;
  length: number = 0;
  subscription: Subscription[] = [];
  avatarUrl = APIURL.avatarurl;

  filterForm = new FormGroup({
    text: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    return this.filterForm.get('fromDate').value;
  }
  get toDate() {
    return this.filterForm.get('toDate').value;
  }
  pipe: DatePipe;

  constructor(
    private store: EmpStoreService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.dataSource.filterPredicate = (data, filter) => { 
    //   if(moment(filter).isValid ){
    //   if (this.fromDate && this.toDate) {
    //     return new Date(data.joindate) >= this.fromDate && new Date(data.joindate) <= this.toDate;
    //   }
    //   return true;
    // }};
  }

  ngOnInit(): void {
    this.subscription.push(
      this.vmEmp$.subscribe((it) => {
        this.employeeList = it.empList;
        this.dataSource.data = this.employeeList;
      })
    );
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchitem(val = '') {
    this.dataSource.filter = val.trim().toLowerCase();;
  }

  // applyFilter() {
  //   this.dataSource.filter = ''+Math.random();
  // }

  sortData(item): void {}

  detailView(emp): void {
    this.store.setState((state): any => {
      state.empId = emp.id;
      return {
        ...state,
      };
    });

    emp.id == null
      ? this.route.navigate(['/employeemanagement/employeeprofile', ''])
      : this.route.navigate(['/employeemanagement/employeeprofile', emp.id]);
  }
}
