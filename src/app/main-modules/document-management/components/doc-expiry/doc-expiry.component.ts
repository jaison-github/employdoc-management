import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Order, Pagination, FilterOperator, MasterDataLookUpTypes } from '@shared/models/master.models';
import { Subscription } from 'rxjs';
import { EmpStoreService } from 'src/app/main-modules/employee-management/store/emp-management.state';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-expiry',
  templateUrl: './doc-expiry.component.html',
  styleUrls: ['./doc-expiry.component.scss']
})
export class DocExpiryComponent implements OnInit {

  @Input() displayedColumns: string[] =   ['doctype','docnumber',  'empname',  'issuedate', 'expirydate', 'remdays', 'status'];

  @Output() selectactiveCourse = new EventEmitter<any>();
  @Input() activeRow = null;
  vmEmp$ = this.store.vm$;

  gridList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.gridList);
  selection = new SelectionModel<any>(false, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;
  sortOrder: Order = new Order;
  pagination: Pagination = new Pagination;
  filter: FilterOperator = new FilterOperator;

  pageIndex: number = 1;
  pageSize: number = 12;
  length: number = 0;
  subscription: Subscription[] = [];
  constructor(private ref: ChangeDetectorRef, private docService: DocService,   private store: EmpStoreService, private route: Router, private activatedRoute: ActivatedRoute
    ) { 


    }

  ngOnInit(): void {
    this.subscription.push(
      this.vmEmp$.subscribe((it) => {
        
      })
    );

    this.getExpiredDocList();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchitem(val = '') {
    this.dataSource.filter = val.trim().toLowerCase();;
  }



  getExpiredDocList(): void{
    this.docService.getDocList(MasterDataLookUpTypes.docexpirylist).subscribe({
      next:(res)=>{
        this.gridList = res;
        this.dataSource.data = this.gridList;
        this.ref.detectChanges();
      },
      error:(err)=>{
        
      }
    })
  }

  
  sortData(item): void {
   
  }


  detailView(emp): void{
    this.store.setState((state): any => {
      state.empId =emp.id;
      return {
         ...state
      };
     });


     emp.id== null
    ? this.route.navigate(['/employeemanagement/employeeprofile', ''])
    : this.route.navigate(['/employeemanagement/employeeprofile', emp.id]);
  }

}